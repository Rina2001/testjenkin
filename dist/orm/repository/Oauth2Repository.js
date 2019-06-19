"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const client_oauth2_entity_1 = require("../entity/client.oauth2.entity");
const authorizationCode_oauth2_entity_1 = require("../entity/authorizationCode.oauth2.entity");
const AccessTokens_oauth2_entity_1 = require("../entity/AccessTokens.oauth2.entity");
const RefreshTokens_oauth2_entity_1 = require("../entity/RefreshTokens.oauth2.entity");
const jwt = require("jsonwebtoken");
const utils_1 = require("../../authorization/utils");
const responseBody_1 = require("./responseBody");
const base_controller_1 = require("../../controller/base.controller");
let ClientOAuth2Repository = class ClientOAuth2Repository extends typeorm_1.Repository {
    // sample data
    // const clients = [
    //     { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false },
    //     { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true },
    //   ];
    findOneByClientId(clientID) {
        return this.findOne({ clientID });
    }
    findByUsername(username) {
        return this.findByUsername(username);
    }
    addClientAuhtorization(client) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            return typeorm_1.getManager().transaction(transactionalEntityManager => {
                client.created = new Date();
                client.isActive = 1;
                return this.save(client)
                    .then(res => {
                    resBody.status = base_controller_1.Status.success;
                    resBody.body = ["1"];
                    return Promise.resolve(resBody);
                })
                    .catch(err => {
                    resBody.status = base_controller_1.Status.logic_error;
                    resBody.body = [err.message];
                    return Promise.resolve(resBody);
                });
            });
        }
        catch (error) {
            resBody.status = base_controller_1.Status.server_error;
            resBody.body = [error.message];
            return Promise.resolve(resBody);
        }
    }
};
ClientOAuth2Repository = __decorate([
    typeorm_1.EntityRepository(client_oauth2_entity_1.ClietnOuath2)
], ClientOAuth2Repository);
exports.ClientOAuth2Repository = ClientOAuth2Repository;
/**
 * @Class AuthorizationCodeOauth2
 */
let AuthorizationCodeOauth2Repository = class AuthorizationCodeOauth2Repository extends typeorm_1.Repository {
    findOneById(ID) {
        return this.findOne({ ID });
    }
    findOneByCode(code) {
        return this.findOne({ code });
    }
    saveAuthorization(auth) {
        return this.save(auth);
    }
    removeByCode(code) {
        try {
            const id = jwt.decode(code);
            const deletedToken = this.findOneById(id); //codes[id];
            this.remove(id);
            return Promise.resolve(deletedToken);
        }
        catch (error) {
            return Promise.resolve(undefined);
        }
    }
};
AuthorizationCodeOauth2Repository = __decorate([
    typeorm_1.EntityRepository(authorizationCode_oauth2_entity_1.AuthorizationCodeOauth2)
], AuthorizationCodeOauth2Repository);
exports.AuthorizationCodeOauth2Repository = AuthorizationCodeOauth2Repository;
/**
 * @Repository Access Token
 */
let AccessTokenOauth2Repository = class AccessTokenOauth2Repository extends typeorm_1.Repository {
    saveToken(accessToken) {
        try {
            const jwtObject = new utils_1.Utils().verifyToken(accessToken.token);
            accessToken.jti = jwtObject.jti;
            return this.save(accessToken);
        }
        catch (error) {
            console.log(error);
            return Promise.resolve(error);
        }
    }
    findOneByUserIdAndClientId(userId, clientID) {
        return this.findOne({ userId, clientID });
    }
    findById(id) {
        return this.findOne(id);
    }
    findByJti(jti) {
        return this.findOne({ jti });
    }
    findByToken(token) {
        try {
            const jwtObject = new utils_1.Utils().verifyToken(token);
            console.log(jwtObject);
            return this.findOne({ jti: jwtObject.jti });
        }
        catch (error) {
            console.log(error);
            return Promise.resolve(error);
        }
    }
    /**
     * Deletes/Revokes an access token by getting the ID and removing it from the storage.
     * @param   {String}  token - The token to decode to get the id of the access token to delete.
     * @returns {Promise} resolved with the deleted token
     */
    deleteByToken(token) {
        console.log("remove token from access token");
        try {
            const jwt = new utils_1.Utils().verifyToken(token); //jwt.decode(token);
            const deletedToken = this.findOne({ jti: jwt.jti });
            deletedToken.then(token => this.remove(token));
            console.log("Access Token removed");
            return deletedToken; // promise object
        }
        catch (error) {
            console.log(error);
            // console.log("error when delete access token")
            return Promise.resolve(undefined);
        }
    }
    /**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
    updateActiveTokenByUserID(userId) {
        console.log("update access token " + userId);
        try {
            typeorm_1.getConnection()
                .createQueryBuilder()
                .update(AccessTokens_oauth2_entity_1.AccessTokenOauth2)
                .set({
                isActive: "0"
            })
                .where("userId = :userId", { userId: userId })
                .execute();
        }
        catch (error) {
            console.log(error);
        }
    }
};
AccessTokenOauth2Repository = __decorate([
    typeorm_1.EntityRepository(AccessTokens_oauth2_entity_1.AccessTokenOauth2)
], AccessTokenOauth2Repository);
exports.AccessTokenOauth2Repository = AccessTokenOauth2Repository;
/**
 * @Repository Access Token
 */
let RefreshTokenOauth2Repository = class RefreshTokenOauth2Repository extends typeorm_1.Repository {
    //**  */
    saveToken(refreshToken) {
        try {
            this.updateActiveTokenByUserID(refreshToken.userID);
            const jwt = new utils_1.Utils().verifyToken(refreshToken.token); //jwt.decode(token);
            refreshToken.jti = jwt.jti;
            return this.save(refreshToken);
        }
        catch (error) {
            console.log(error);
            return Promise.resolve(error);
        }
    }
    findByJti(jti) {
        return this.findOne({ jti });
    }
    /**
     *
     * @param token refresh token
     */
    findByToken(token) {
        try {
            const jwt = new utils_1.Utils().verifyToken(token); //jwt.decode(token);
            console.log(jwt);
            return this.findByJti(jwt.jti);
        }
        catch (error) {
            console.log("RefreshTokenOauth2Repository - findByToken : " + error);
        }
        return Promise.resolve(undefined);
    }
    findOneByUserIdAndClientId(userID, clientID) {
        return this.findOne({ userID, clientID });
    }
    /**
     * Deletes/Revokes an refresh token by getting the ID and removing it from the storage.
     * @param   {String}  token - The token to decode to get the id of the refresh token to delete.
     * @returns {Promise} resolved with the deleted token
     */
    deleteByToken(token) {
        try {
            const jwt = new utils_1.Utils().verifyToken(token); //jwt.decode(token);
            const deletedToken = this.findOne({ jti: jwt.jti });
            deletedToken.then(object => this.remove(object));
            return deletedToken;
        }
        catch (error) {
            console.log(error);
            return Promise.resolve(undefined);
        }
    }
    /**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
    updateActiveTokenByUserID(userID) {
        console.log("update old refresh token to zero by userID " + userID);
        try {
            typeorm_1.getConnection()
                .createQueryBuilder()
                .update(RefreshTokens_oauth2_entity_1.RefreshTokenOauth2)
                .set({
                isActive: "0"
            })
                .where("userID = :userID", { userID: userID })
                .execute();
        }
        catch (error) {
            console.log(error);
        }
    }
};
RefreshTokenOauth2Repository = __decorate([
    typeorm_1.EntityRepository(RefreshTokens_oauth2_entity_1.RefreshTokenOauth2)
], RefreshTokenOauth2Repository);
exports.RefreshTokenOauth2Repository = RefreshTokenOauth2Repository;
//# sourceMappingURL=Oauth2Repository.js.map