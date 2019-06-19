import { Repository, EntityRepository, Code, getManager, PrimaryColumn, getConnection } from 'typeorm';
import { ClietnOuath2 } from '../entity/client.oauth2.entity';
import { AuthorizationCodeOauth2 } from '../entity/authorizationCode.oauth2.entity';
import { AccessTokenOauth2 } from '../entity/AccessTokens.oauth2.entity';
import { RefreshTokenOauth2 } from '../entity/RefreshTokens.oauth2.entity';

import * as jwt from "jsonwebtoken"
import { Utils } from '../../authorization/utils';
import { ResponseBody } from './responseBody';
import { Status } from '../../controller/base.controller';

@EntityRepository(ClietnOuath2)
export class ClientOAuth2Repository extends Repository<ClietnOuath2>{
// sample data
// const clients = [
//     { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false },
//     { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true },
//   ];


    findOneByClientId(clientID:String){
        return this.findOne({clientID});
    }

    findByUsername(username:String){
        return this.findByUsername(username);
    }

    addClientAuhtorization(client:ClietnOuath2){
        let resBody:ResponseBody<any> =new ResponseBody()
        try {
          return getManager().transaction(transactionalEntityManager=>{
                   client.created = new Date()
                   client.isActive = 1
                  return this.save(client)
                              .then(res=>{
                                          resBody.status = Status.success
                                          resBody.body = ["1"]
                                                  return Promise.resolve(resBody)
                                         })
                                          .catch(err=>{
                                                     resBody.status = Status.logic_error
                                                     resBody.body = [err.message]
                                                     return Promise.resolve(resBody)
                                          })
                   
             })
        }
        catch (error) 
        {
            resBody.status = Status.server_error
            resBody.body = [error.message]
            return Promise.resolve(resBody)
       }
    }


}

/**
 * @Class AuthorizationCodeOauth2
 */

@EntityRepository(AuthorizationCodeOauth2)
export class AuthorizationCodeOauth2Repository extends Repository<AuthorizationCodeOauth2>{
    findOneById(ID:number){
        return this.findOne({ID});
    }

    findOneByCode(code:string){
        return this.findOne({code});
    }

    saveAuthorization(auth:AuthorizationCodeOauth2){
        return this.save(auth);
    }

    

    removeByCode(code:string){
        try {
            const id:any = jwt.decode(code);
            const deletedToken = this.findOneById(id) //codes[id];
           this.remove(id)
            return Promise.resolve(deletedToken);
          } catch (error) {
            return Promise.resolve(undefined);
          }
    }


}

/**
 * @Repository Access Token
 */
@EntityRepository(AccessTokenOauth2)
export class AccessTokenOauth2Repository extends Repository<AccessTokenOauth2>{
    saveToken(accessToken:AccessTokenOauth2){
      try {
          const jwtObject=new Utils().verifyToken(accessToken.token);
          accessToken.jti=jwtObject.jti;

        return this.save(accessToken);
      } catch (error) {
          console.log(error)
          return Promise.resolve(error)
      }
    }

    findOneByUserIdAndClientId(userId:number,clientID:string){
        return this.findOne({ userId, clientID})
    }

    findById(id:number){
        return this.findOne(id)
    }

    findByJti(jti:String){
        return this.findOne({jti})
    }

    findByToken(token:String){
        try {
            const jwtObject=new Utils().verifyToken(token);
            console.log(jwtObject)
            return this.findOne({jti:jwtObject.jti}) 
            
        } catch (error) {
            console.log(error)
            return Promise.resolve(error)
        }
        
    }
/**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
    deleteByToken(token:string): Promise<AccessTokenOauth2>{
        console.log("remove token from access token")
        try {
            const jwt=new Utils().verifyToken(token)   //jwt.decode(token);
            const deletedToken = this.findOne({jti:jwt.jti})
            deletedToken.then(token=>this.remove(token))
            console.log("Access Token removed")
            return deletedToken; // promise object
          } catch (error) {
              console.log(error)
           // console.log("error when delete access token")
            return Promise.resolve(undefined);
          }
    }


    /**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
updateActiveTokenByUserID(userId:number){
    console.log("update access token "+userId);
    try {

        getConnection()
        .createQueryBuilder()
        .update(AccessTokenOauth2)
        .set({ 
            isActive: "0"
        })
        .where("userId = :userId", { userId: userId })
        .execute();
        
      } catch (error) {
          console.log(error)
      }
}





}

/**
 * @Repository Access Token
 */
@EntityRepository(RefreshTokenOauth2)
export class RefreshTokenOauth2Repository extends Repository<RefreshTokenOauth2>{


    //**  */
    saveToken(refreshToken:RefreshTokenOauth2){
        try {
            this.updateActiveTokenByUserID(refreshToken.userID)
            const jwt=new Utils().verifyToken(refreshToken.token)   //jwt.decode(token);
            refreshToken.jti=jwt.jti
            return this.save(refreshToken);
        } catch (error) {
            console.log(error)
            return Promise.resolve(error)
        }
    }

    findByJti(jti:String){
        return this.findOne({jti})
    }

  /**
   * 
   * @param token refresh token
   */
    findByToken(token):Promise<RefreshTokenOauth2>{
        try{
            const jwt=new Utils().verifyToken(token)   //jwt.decode(token);
            console.log(jwt)
            return this.findByJti(jwt.jti)
        }
        catch(error){
            console.log("RefreshTokenOauth2Repository - findByToken : "+error)
        }
        return Promise.resolve(undefined)
    }

    findOneByUserIdAndClientId(userID:number,clientID:string){
        return this.findOne({ userID, clientID})
    }

/**
 * Deletes/Revokes an refresh token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the refresh token to delete.
 * @returns {Promise} resolved with the deleted token
 */
    deleteByToken(token:string): Promise<any>{
        try {
            const jwt=new Utils().verifyToken(token)   //jwt.decode(token);
            const deletedToken =  this.findOne({jti:jwt.jti})
            deletedToken.then(object=>this.remove(object))
            return deletedToken;
          } catch (error) {
              console.log(error)
            return Promise.resolve(undefined);
          }
    }


    /**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
updateActiveTokenByUserID(userID:number){
    console.log("update old refresh token to zero by userID "+userID)
    try {
        getConnection()
        .createQueryBuilder()
        .update(RefreshTokenOauth2)
        .set({ 
            isActive: "0"
        })
        .where("userID = :userID", { userID: userID })
        .execute();
        
      } catch (error) {
          console.log(error)
    }

}


}


