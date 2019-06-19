'use strict';


import { env } from 'process';
import { getCustomRepository } from 'typeorm';
import { User } from 'orm/entity/user.entity';
import { ClietnOuath2 } from 'orm/entity/client.oauth2.entity';
import { Utils } from './utils';
import { UserRepository } from '../orm/repository/user.repository';
import { RefreshTokenOauth2Repository, ClientOAuth2Repository } from '../orm/repository/Oauth2Repository';
import { AccessTokenOauth2Repository } from '../orm/repository/Oauth2Repository';
import { RefreshTokenOauth2 } from '../orm/entity/RefreshTokens.oauth2.entity';

/** Validate object to attach all functions to  */
// const validate = Object.create(null);

/** Suppress tracing for things like unit testing */
const suppressTrace = env.OAUTHRECIPES_SURPRESS_TRACE === 'true';

const util=new Utils();
//(())

export default class Validate{
/**
 * Log the message and throw it as an Error
 * @param   {String} msg - Message to log and throw
 * @throws  {Error}  The given message as an error
 * @returns {undefined}
 */
  logAndThrow(msg: string):void{
      if (!suppressTrace) {
      console.trace(msg);
    }
      throw new Error(msg);
    };

    /**
 * Given a user and a password this will return the user if it exists and the password matches,
 * otherwise this will throw an error
 * @param   {Object} user     - The user profile
 * @param   {String} password - The user's password
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
user(user: User, password: string): User{
  console.log(" "+user.userName)
  this.userExists(user);
  if (user.password !== password) {
    this.logAndThrow('User password does not match');
  }
    return user;
  };

/**
 * Given a user this will return the user if it exists otherwise this will throw an error
 * @param   {Object} user - The user profile
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
userExists(user: object): object {
  if (user == null) {
    this.logAndThrow('User does not exist');
  }
  return user;
};

/**
 * Given a client and a client secret this return the client if it exists and its clientSecret
 * matches, otherwise this will throw an error
 * @param   {Object} client       - The client profile
 * @param   {String} clientSecret - The client's secret
 * @throws  {Error}  If the client or the client secret does not match
 * @returns {Object} The client if valid
 */
client(client: ClietnOuath2, clientSecret: string): object{
  this.clientExists(client);
  if (client.clientSecret !== clientSecret) {
    this.logAndThrow('Client secret does not match');
  }
  return client;
};

/**
 * Given a client this will return the client if it exists , otherwise this will throw an error
 * @param   {Object} client - The client profile
 * @throws  {Error}  If the client does not exist
 * @returns {Object} The client if valid
 */
clientExists(client: ClietnOuath2): ClietnOuath2 {
  if (client == null) {
    this.logAndThrow('Client does not exist');
  }
  return client;
};

/**
 * 
 * Given a token and accessToken this will return either the user or the client associated with
 * the token if valid.  Otherwise this will throw.
 * @param   {Object}  token       - The token
 * @param   {O bject}  accessToken - The access token
 * @throws  {Error}   If the token is not valid
 * @returns {Promise} Resolved with the user or client associated with the token if valid
 * @Sample http://localhost:3002/User/getListUsers?access_token=
 */
async  token(token: any, accessToken: any): Promise<any> {
  console.log("validate_access_token")
  console.log(accessToken)
  util.verifyToken(accessToken);
  // token is a user token
  // token is a client token

  // return clients.find(token.clientID)
  // .then(client => validate.clientExists(client))
  // .then(client => client);

   if(token.userID != null){
    const userRepository=getCustomRepository(UserRepository)
        //const userObject= await userRepository.findById(token.userID );
      return userRepository.findUserByID(token.userID)
             .then(userObject=>this.userExists(userObject.body[0]))
             .then(userObjectExist=>userObjectExist)
   }

   return getCustomRepository(ClientOAuth2Repository).findOneByClientId(token.clientID)
          .then(clientObject=>this.clientExists(clientObject))
          .then(clientExist=>clientExist)


};

  /**
 * Given a refresh token and client this will return the refresh token if it exists and the client
 * id's match otherwise this will throw an error
 * throw an error
 * @param   {Object} token        - The token record from the DB
 * @param   {Object} refreshToken - The raw refresh token
 * @param   {Object} client       - The client profile
 * @throws  {Error}  If the refresh token does not exist or the client id's don't match
 * @returns {Object} The refresh token if valid
 */
 refreshToken(token: any, refreshToken: String, client: ClietnOuath2): object {
   console.log("Refresh_Token")
   console.log(token)
   console.log(token.userID)
   getCustomRepository(AccessTokenOauth2Repository).updateActiveTokenByUserID(token.userID)
  util.verifyToken(refreshToken);
  
  if (client.clientID !== token.clientID) {
    this.logAndThrow('RefreshToken clientID does not match client id given');
  }
  return token;
};

/**
 * Given a auth code, client, and redirectURI this will return the auth code if it exists and is
 * not 0, the client id matches it, and the redirectURI matches it, otherwise this will throw an
 * error.
 * @param  {Object}  code        - The auth code record from the DB
 * @param  {Object}  authCode    - The raw auth code
 * @param  {Object}  client      - The client profile
 * @param  {Object}  redirectURI - The redirectURI to check against
 * @throws {Error}   If the auth code does not exist or is zero or does not match the client or
 *                   the redirectURI
 * @returns {Object} The auth code token if valid
 */
authCode(code: any, authCode: any, client: ClietnOuath2, redirectURI: any): any {
  util.verifyToken(code);
  if (client.clientID !== authCode.clientID) {
    this.logAndThrow('AuthCode clientID does not match client id given');
  }
  if (redirectURI !== authCode.redirectURI) {
    this.logAndThrow('AuthCode redirectURI does not match redirectURI given');
  }
  return authCode;
};

/**
 * I mimic openid connect's offline scope to determine if we send a refresh token or not
 * @param   {Array}   scope - The scope to check if is a refresh token if it has 'offline_access'
 * @returns {Boolean} true If the scope is offline_access, otherwise false
 */
 isRefreshToken = (scope : Array<any>): boolean => scope != null && scope.indexOf('offline_access') === 0;

 /**
 * Given a userId, clientID, and scope this will generate a refresh token, save it, and return it
 * @param   {Object}  userId   - The user profile
 * @throws  {Object}  clientID - the client profile
 * @throws  {Object}  scope    - the scope
 * @returns {Promise} The resolved refresh token after saved
 */
async generateRefreshToken(refreshToken:RefreshTokenOauth2): Promise<any> {
  // const refreshToken = util.createToken({ sub : userId, exp : _refreshToken.expiresIn });
  // return refreshTokens.save(refreshToken, userId, clientID, scope)
  // .then(() => refreshToken);

console.log("genertateRefreshToken 1")
//console.log(util.refreshToken.expiresIn)
 try {
    
    const createRefreshToken= util.creatToken(
          util.refreshToken.expiresIn,
          ""+refreshToken.userID);

    const refreshTokenRepository=getCustomRepository(RefreshTokenOauth2Repository)
    const refreshObject = refreshTokenRepository.create()
          refreshObject.clientID=refreshToken.clientID,
          refreshObject.userID=refreshToken.userID,
          refreshObject.scope=refreshToken.scope
          refreshObject.token=createRefreshToken

    await refreshTokenRepository.saveToken(refreshObject);
    return createRefreshToken               
 } catch (error) {
   console.log(error)

 }                    
};

/**
 * Given an auth code this will generate a access token, save that token and then return it.
 * @param   {userID}   userID   - The user profile
 * @param   {clientID} clientID - The client profile
 * @param   {scope}    scope    - The scope
 * @returns {Promise}  The resolved refresh token after saved
 */
async generateToken ({ userID, clientID, scope }:any): Promise<any> {
  // const token      = createToken({ sub : userID, exp : _token.expiresIn });
  // const expiration = _token.calculateExpirationDate();
  // return accessTokens.save(token, expiration, userID, clientID, scope)
  // .then(() => token);

  console.log("generate_access_token_in_validate")
  console.log(userID)
   try {
    const accessTokenRepository=getCustomRepository(AccessTokenOauth2Repository)
    const expiration= util.token.calculateExpirationDate()
    const token=util.creatToken(util.token.expiresIn,userID)
    console.log("generateAccessToken "+token)

    const accessObject=accessTokenRepository.create()
          accessObject.token=token;
          accessObject.expirationDate=expiration
          accessObject.userId=userID
          accessObject.clientID=clientID
          accessObject.scope=scope


    
     await   accessTokenRepository.saveToken(accessObject)
       return token;
   } catch (error) {
     console.log(error)
      return null; 
   }

};

/**
 * Given an auth code this will generate a access and refresh token, save both of those and return
 * them if the auth code indicates to return both.  Otherwise only an access token will be returned.
 * @param   {Object}  authCode - The auth code
 * @throws  {Error}   If the auth code does not exist or is zero
 * @returns {Promise} The resolved refresh and access tokens as an array
 */
generateTokens(authCode: any): Promise<any> {
// console.log(authCode)
  if (this.isRefreshToken(authCode.scope)) {
    
    return Promise.all([
      this.generateToken(authCode),
      this.generateRefreshToken(authCode),
    ]);
  }
  return Promise.all([this.generateToken(authCode)]);
};

/**
 * Given a token this will resolve a promise with the token if it is not null and the expiration
 * date has not been exceeded.  Otherwise this will throw a HTTP error.
 * @param   {Object}  token - The token to check
 * @returns {Promise} Resolved with the token if it is a valid token otherwise rejected with error
 */
tokenForHttp = (token: any): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      util.verifyToken(token);
    } catch (err) {
      const error:any  = new Error('invalid_token');
      error.status = 400;
      reject(error);
      console.log("tokenForHttp")
      console.log(err)
    }
    resolve(token);
  });

  /**
 * Given a token this will return the token if it is not null. Otherwise this will throw a
 * HTTP error.
 * @param   {Object} token - The token to check
 * @throws  {Error}  If the client is null
 * @returns {Object} The client if it is a valid client
 */
tokenExistsForHttp(token: any): any {
  if (token == null) {
    let error:any;
    error= new Error('invalid_token');
    error.status = 400;
    throw error;
  }
  return token;
};

/**
 * Given a client this will return the client if it is not null. Otherwise this will throw a
 * HTTP error.
 * @param   {Object} client - The client to check
 * @throws  {Error}  If the client is null
 * @returns {Object} The client if it is a valid client
 */
clientExistsForHttp(client: any): any{
  if (client == null) {
    let error:any  = new Error('invalid_token');
    error.status = 400;
    throw error;
  }
  return client;
};

}

