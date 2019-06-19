"use strict";
//'use strict';
/**
 * @Autor Rina Chen trusted developer :)
 */
// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { token as _token, codeToken } from './config';
//import { authorizationCodes, accessTokens, users, refreshTokens, clients } from './db';
//import { ensureLoggedIn } from 'connect-ensure-login';
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
const user_repository_1 = require("../orm/repository/user.repository");
const Oauth2Repository_1 = require("../orm/repository/Oauth2Repository");
const validate_1 = require("./validate");
const oauth2orize_1 = require("oauth2orize");
const passport_1 = require("passport");
const connect_ensure_login_1 = require("connect-ensure-login");
// create OAuth 2.0 server
const server = oauth2orize_1.createServer();
const util = new utils_1.Utils();
const validate = new validate_1.default();
// Configured expiresIn
const expiresIn = { expires_in: util.token.expiresIn };
// Repository
/**
 * Grant authorization codes
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
server.grant(oauth2orize_1.grant.code((client, redirectURI, user, ares, done) => {
    // const code = createToken({ sub : user.id, exp : codeToken.expiresIn });
    // authorizationCodes.save(code, client.id, redirectURI, user.id, client.scope)
    // .then(() => done(null, code))
    // .catch(err => done(err));
    try {
        console.log("object 1");
        const authorizationRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.AuthorizationCodeOauth2Repository);
        const code = util.creatToken(util.codeToken.expiresIn, user.ID);
        const authorizationObject = authorizationRepository.create();
        authorizationObject.code = code;
        authorizationObject.clientID = client.clientID;
        authorizationObject.redirectUri = redirectURI;
        authorizationObject.userId = user.ID;
        authorizationObject.scope = client.scope;
        authorizationRepository.save(authorizationObject);
        return done(null, code);
    }
    catch (err) {
        return done(err);
    }
}));
/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
server.grant(oauth2orize_1.grant.token((client, user, ares, done) => __awaiter(this, void 0, void 0, function* () {
    // const token      = createToken({ sub : user.id, exp : _token.expiresIn });
    // const expiration = _token.calculateExpirationDate();
    // accessTokens.save(token, expiration, user.id, client.id, client.scope)
    // .then(() => done(null, token, expiresIn))
    // .catch(err => done(err));
    try {
        console.log("object 2");
        const accessTokenRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.AccessTokenOauth2Repository);
        const token = util.creatToken(util.token.expiresIn, user.ID);
        const expiration = util.token.calculateExpirationDate();
        console.log("calculateExpirationDate token => " + expiration);
        const accessTokenObject = accessTokenRepository.create();
        accessTokenObject.token = token;
        accessTokenObject.expirationDate = expiration;
        accessTokenObject.userId = user.ID;
        accessTokenObject.clientID = client.clientID;
        accessTokenObject.scope = client.scope;
        yield accessTokenRepository.save(accessTokenObject);
        return done(null, token, expiration);
    }
    catch (error) {
        console.log(error);
        return done(error);
    }
})));
/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 */
server.exchange(oauth2orize_1.exchange.code((client, code, redirectURI, done) => __awaiter(this, void 0, void 0, function* () {
    // authorizationCodes.delete(code)
    // .then(authCode => _authCode(code, authCode, client, redirectURI))
    // .then(authCode => generateTokens(authCode))
    // .then((tokens) => {
    //   if (tokens.length === 1) {
    //     return done(null, tokens[0], null, expiresIn);
    //   }
    //   if (tokens.length === 2) {
    //     return done(null, tokens[0], tokens[1], expiresIn);
    //   }
    //   throw new Error('Error exchanging auth code for tokens');
    // })
    // .catch(() => done(null, false));
    try {
        const authorizationRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.AuthorizationCodeOauth2Repository);
        const authoCode = yield authorizationRepository.removeByCode(code);
        console.log("objects 3 " + authoCode);
        validate.
            generateToken(validate.authCode(code, authoCode, client, redirectURI))
            .then((tokens) => {
            if (tokens.length === 1) {
                return done(null, tokens[0], null, expiresIn);
            }
            if (tokens.length === 2) {
                return done(null, tokens[0], tokens[1], expiresIn);
            }
            throw new Error("Error exchanging auth code for tokens'");
        });
    }
    catch (err) {
        return done(null, false);
    }
})));
/**
 * Exchange user id and password for access tokens.
 *
 * The callback accepts the `client`, which is exchanging the user's name and password
 * from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the user who authorized the code.
 */
server.exchange(oauth2orize_1.exchange.password((client, username, password, scope, done) => {
    console.log("object 4");
    console.log(client);
    const userRepository = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
    userRepository.findByUsername(username)
        .then(user => validate.user(user, password))
        .then(user => validate.generateTokens({ scope, userID: user.ID, clientID: client.clientID }))
        .then((tokens) => {
        if (tokens === false) {
            return done(null, false);
        }
        if (tokens.length === 1) {
            return done(null, tokens[0], null, expiresIn);
        }
        if (tokens.length === 2) {
            return done(null, tokens[0], tokens[1], expiresIn);
        }
        throw new Error('Error exchanging password for tokens');
    })
        .catch(() => done(null, false));
}));
/**
 * Exchange the client id and password/secret for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id and
 * password/secret from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the client who authorized the code.
 */
server.exchange(oauth2orize_1.exchange.clientCredentials((client, scope, done) => {
    console.log("object 6");
    const token = util.creatToken(util.token.expiresIn, client.id);
    const expiration = util.token.calculateExpirationDate();
    console.log(client);
    // Pass in a null for user id since there is no user when using this grant type
    // acce.save(token, expiration, null, client.id, scope)
    // .then(() => done(null, token, null, expiresIn))
    // .catch(err => done(err));
    try {
        const accessTokenRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.AccessTokenOauth2Repository);
        const accessTokenObject = accessTokenRepository.create();
        accessTokenObject.token = token;
        accessTokenObject.expirationDate = expiration;
        accessTokenObject.userId = null,
            accessTokenObject.clientID = client.clientID;
        accessTokenObject.scope = scope[0];
        accessTokenRepository.save(accessTokenObject);
        return done(null, token, null, expiresIn);
    }
    catch (error) {
        return done(error);
    }
}));
/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 */
server.exchange(oauth2orize_1.exchange.refreshToken((client, refreshToken, scope, done) => {
    console.log("server exchange refresh token");
    const refreshTokenRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.RefreshTokenOauth2Repository);
    refreshTokenRepository.findByToken(refreshToken)
        .then(foundRefreshToken => validate.refreshToken(foundRefreshToken, refreshToken, client))
        .then(foundRefreshToken => validate.generateToken(foundRefreshToken))
        .then(token => done(null, token, null, expiresIn))
        .catch(() => done(null, false));
}));
exports.authorization = [
    connect_ensure_login_1.ensureLoggedIn(),
    server.authorization((clientID, redirectURI, done) => {
        console.log("authorization");
        const clientRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.ClientOAuth2Repository);
        clientRepository.findOneByClientId(clientID)
            .then((client) => {
            // if (client) {
            //   client.scope = scope; // eslint-disable-line no-param-reassign
            // }
            // WARNING: For security purposes, it is highly advisable to check that
            //          redirectURI provided by the client matches one registered with
            //          the server.  For simplicity, this example does not.  You have
            //          been warned.
            return done(null, client, redirectURI);
        })
            .catch(err => done(err));
    }), (req, res, next) => {
        // Render the decision dialog if the client isn't a trusted client
        // TODO:  Make a mechanism so that if this isn't a trusted client, the user can record that
        // they have consented but also make a mechanism so that if the user revokes access to any of
        // the clients then they will have to re-consent.
        const clientRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.ClientOAuth2Repository);
        clientRepository.findOneByClientId(req.query.client_id)
            .then((client) => {
            if (client != null && client.trustedClient && client.trustedClient === true) {
                // This is how we short call the decision like the dialog below does
                server.decision((serverReq, callback) => {
                    callback(null, { allow: true });
                })(req, res, next);
            }
            else {
                res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
            }
        })
            .catch(() => res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client }));
    }
];
exports.decision = [
    connect_ensure_login_1.ensureLoggedIn(),
    server.decision(),
];
exports.token = [
    passport_1.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler(),
];
// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTPS request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.
server.serializeClient((client, done) => done(null, client.id));
server.deserializeClient((id, done) => {
    const clientRepository = typeorm_1.getCustomRepository(Oauth2Repository_1.ClientOAuth2Repository);
    clientRepository.findOneByClientId(id)
        .then(client => done(null, client))
        .catch(err => done(err));
});
//# sourceMappingURL=oauth2.js.map