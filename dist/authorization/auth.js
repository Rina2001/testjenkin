'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const LocalStrategy = require("passport-local");
const BasicStrategy = require("passport-http");
const ClientPasswordStrategy = require("passport-oauth2-client-password");
const BearerStrategy = require("passport-http-bearer");
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../orm/repository/user.repository");
const validate_1 = require("./validate");
const Oauth2Repository_1 = require("../orm/repository/Oauth2Repository");
const Oauth2Repository_2 = require("../orm/repository/Oauth2Repository");
/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
const validate = new validate_1.default();
passport.use(new LocalStrategy.Strategy((username, password, done) => {
    const userRepo = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
    userRepo.findByUsername(username)
        .then(user => validate.user(user, password))
        .then(user => done(null, user))
        .catch(() => done(null, false));
}));
/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy.BasicStrategy((clientId, clientSecret, done) => {
    console.log("Basic Strategy");
    const clientRepo = typeorm_1.getCustomRepository(Oauth2Repository_1.ClientOAuth2Repository);
    clientRepo.findOneByClientId(clientId)
        .then(client => validate.client(client, clientSecret))
        .then(client => done(null, client))
        .catch(() => done(null, false));
}));
/**
 * Client Password strategy
 *
 * The OAuth 2.0 client password authentication strategy authenticates clients
 * using a client ID and client secret. The strategy requires a verify callback,
 * which accepts those credentials and calls done providing a client.
 */
passport.use(new ClientPasswordStrategy.Strategy((clientId, clientSecret, done) => {
    const clientRepo = typeorm_1.getCustomRepository(Oauth2Repository_1.ClientOAuth2Repository);
    clientRepo.findOneByClientId(clientId)
        .then(client => validate.client(client, clientSecret))
        .then(client => done(null, client))
        .catch(() => done(null, false));
}));
/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 *
 * To keep this example simple, restricted scopes are not implemented, and this is just for
 * illustrative purposes
 */
passport.use(new BearerStrategy.Strategy((accessToken, done) => {
    console.log("Bearer Strategy");
    const accessTokenRepo = typeorm_1.getCustomRepository(Oauth2Repository_2.AccessTokenOauth2Repository);
    accessTokenRepo.findByToken(accessToken)
        .then(token => validate.token(token, accessToken))
        .then(token => done(null, token, "*"))
        .catch(() => done(null, false));
}));
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
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    const userRepo = typeorm_1.getCustomRepository(user_repository_1.UserRepository);
    userRepo.findUserByID(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});
//# sourceMappingURL=auth.js.map