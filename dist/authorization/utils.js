"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const jwt = require("jsonwebtoken");
const fs = require("fs");
/** Private certificate used for signing JSON WebTokens */
// const privateKey = fs.readFileSync(path.join(__dirname, 'certs/privatekey.pem'));
/** Public certificate used for verification.  Note: you could also use the private key */
// const publicKey = fs.readFileSync(path.join(__dirname, 'certs/certificate.pem'));
/** Private certificate used for signing JSON WebTokens */
// const privateKey = fs.readFileSync('certs/privatekey.pem');
// /** Public certificate used for verification.  Note: you could also use the private key */
// const publicKey = fs.readFileSync('certs/publicKey.pem');
const privateKey = fs.readFileSync(__dirname + '/certs/privateKey.pem');
const publicKey = fs.readFileSync(__dirname + '/certs/publicKey.pem');
class Utils {
    constructor() {
        /**
         * Creates a signed JSON WebToken and returns it.  Utilizes the private certificate to create
         * the signed JWT.  For more options and other things you can change this to, please see:
         * https://github.com/auth0/node-jsonwebtoken
         *
         * @param  {Number} exp - The number of seconds for this token to expire.  By default it will be 60
         *                        minutes (3600 seconds) if nothing is passed in.
         * @param  {String} sub - The subject or identity of the token. //userID
         * @return {String} The JWT Token
         */
        /**
       * Configuration of access tokens.
       *
       * expiresIn               - The time in minutes before the access token expires. Default is 1 mn
       * calculateExpirationDate - A simple function to calculate the absolute time that the token is
       *                           going to expire in.
       */
        this.token = {
            expiresIn: 60,
            calculateExpirationDate: () => new Date(Date.now() + (this.token.expiresIn * 1000)),
        };
        /**
        * Configuration of code token.
        * expiresIn - The time in minutes before the code token expires.  Default is 5 minutes.
        */
        this.codeToken = {
            expiresIn: 5 * 60,
        };
        /**
         * Configuration of refresh token.
         * expiresIn - The time in minutes before the code token expires.  Default is 8 (28800Sec) hour.  Most if
         *             all refresh tokens are expected to not expire.  However, I give it a very long shelf
         *             life instead.
         * expiresIn as second
         */
        this.refreshToken = {
            expiresIn: 3600 * 8,
        };
        this.db = {
            timeToCheckExpiredTokens: 3600,
        };
        this.session = {
            maxAge: 3600000 * 24 * 7 * 52,
            secret: 'A Secret That Should Be Changed',
        };
    }
    creatToken(exp = 3600, sub = "") {
        console.log("create Token 1" + exp + " " + sub);
        try {
            const newJWT = jwt.sign({
                jti: uuid(),
                sub,
                exp: Math.floor(Date.now() / 1000) + exp,
            }, privateKey, {
                algorithm: 'RS256',
            });
            console.log("create Token 2 " + newJWT);
            return newJWT;
        }
        catch (error) {
            console.log(error);
        }
        return null;
    }
    /**
   * Verifies the token through the jwt library using the public certificate.
   * @param   {String} token - The token to verify
   * @throws  {Error} Error if the token could not be verified
   * @returns {Object} The token decoded and verified
   */
    // exports.verifyToken = token => jwt.verify(token, publicKey);
    verifyToken(token) {
        console.log("verify_token");
        console.log(token);
        return jwt.verify(token, publicKey);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map