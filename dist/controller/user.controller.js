"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../orm/repository/user.repository");
const Oauth2Repository_1 = require("../orm/repository/Oauth2Repository");
const passport = require("passport");
class UserController extends base_controller_1.baseController {
    constructor() {
        super();
        this.controllerName = "/User/";
    }
    /**
    * @method getListUsers
    * @param app
    */
    addUsers(app) {
        app
            .post(this.controllerName + "addUsers", 
        //    passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let user = req.body;
            typeorm_1.getCustomRepository(user_repository_1.UserRepository).addUser(user).then(qb => { res.send(qb); });
        });
    }
    /**
     * @method getListUsers
     * @param app
     */
    getListUsers(app) {
        app
            .post(this.controllerName + "getListUsers", passport.authenticate('bearer', { session: false }), (req, res) => {
            let pageIndex = req.body.pageIndex;
            let pageSize = req.body.pageSize;
            typeorm_1.getCustomRepository(user_repository_1.UserRepository).getListUsers(pageIndex, pageSize).then(qb => { res.send(qb); });
        });
    }
    /**
     * @method : getListUsersByType
     * @param app
     */
    getListUsersByType(app) {
        app
            .post(this.controllerName + "getListUsersByType", passport.authenticate('bearer', { session: false }), (req, res) => {
            let userType = req.body.userType;
            console.log(userType);
            typeorm_1.getCustomRepository(user_repository_1.UserRepository).getListUsersByType(userType).then(qb => { res.send(qb); });
        });
    }
    /**
     * @method getCountUser
     * @param app
     */
    getCountUsers(app) {
        app
            .post(this.controllerName + "getCountUsers", 
        // passport.authenticate('bearer', { session: false }),
        (req, res) => {
            typeorm_1.getCustomRepository(user_repository_1.UserRepository).getCountUsers()
                .then(qb => { res.send(qb); });
        });
    }
    /**
     * @method
     */
    findUserByID(app) {
        app
            .post(this.controllerName + "findUserByID", 
        // passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let ID = req.body.ID;
            typeorm_1.getCustomRepository(user_repository_1.UserRepository).findUserByID(ID)
                .then(qb => {
                res.send(qb);
            });
        });
    }
    /**
     * @method removeUserByID
     * @param userID
     */
    removeUserByID(app) {
        app
            .post(this.controllerName + "removeUserByID", 
        // passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let ID = req.body.ID;
            typeorm_1.getCustomRepository(user_repository_1.UserRepository).removeUserByID(ID)
                .then(qb => { res.send(qb); });
        });
    }
    // outhorization setting
    /**
     * @method removeUserByID
     * @param userID
     */
    addClientAuhtorization(app) {
        app
            .post(this.controllerName + "addClientAuhtorization", 
        // passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let u = req.body;
            typeorm_1.getCustomRepository(Oauth2Repository_1.ClientOAuth2Repository).addClientAuhtorization(u)
                .then(qb => { res.send(qb); });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map