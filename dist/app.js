"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const typeorm_1 = require("typeorm");
const user_controller_1 = require("./controller/user.controller");
const pre_defined_controller_1 = require("./controller/pre_defined.controller");
const oauth2 = require("./authorization/oauth2");
const token_1 = require("./authorization/token");
const group_permission_controller_1 = require("./controller/group.permission.controller");
const passport = require("passport");
const auth = require("./authorization/auth");
/**
 * Scripter  : Rina Chen :>
 */
class App {
    constructor() {
        this.token = new token_1.Token();
        this.userController = new user_controller_1.UserController();
        this.usrGrpPermisController = new group_permission_controller_1.GroupPermissionController();
        this.preDefinedFieldController = new pre_defined_controller_1.PreDefinedFieldController();
        this.app = express();
        this.config();
        // inititalize database
        this.initDatabase();
        // API 
        this.authorizationServer();
        //1/ USE
        this.getUserController();
        //2/ Permission
        this.groupPermissionController();
        //2/     
        this.getPredefinedFieldController();
    }
    config() {
        // serving static files 
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        //  this.sessionManager()
    }
    authorizationServer() {
        auth;
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.get('/dialog/authorize', oauth2.authorization);
        this.app.post('/dialog/authorize/decision', oauth2.decision);
        this.app.post('/oauth/token', oauth2.token);
        //  this.app.post('/oauth/token',oauth2.token);
        this.app.post('/api/revoke', this.token.revoke);
        // this.app.post("/", (req,res) => {   
        //     res.status(200).send(
        //         'Hello world'
        //     )
        //   });
    }
    /**
    * @method init Database
    */
    initDatabase() {
        typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
            yield connection.runMigrations();
            console.log("ORM connected");
        })).catch(error => {
            console.log(error);
        });
    }
    /**
     * @controller  getUserController
     */
    getUserController() {
        // this.userController.addNewUser(this.app)
        this.userController.addUsers(this.app);
        this.userController.getListUsers(this.app);
        this.userController.getListUsersByType(this.app);
        this.userController.getCountUsers(this.app);
        this.userController.findUserByID(this.app);
        this.userController.removeUserByID(this.app);
        //authorization setting
        this.userController.addClientAuhtorization(this.app);
    }
    groupPermissionController() {
        this.usrGrpPermisController.getPermissionByGroupID(this.app);
        this.usrGrpPermisController.updateGroupPermission(this.app);
        this.usrGrpPermisController.addNewGroupPermission(this.app);
    }
    /**
     * @controller getPredefinedFieldController
     */
    getPredefinedFieldController() {
        this.preDefinedFieldController.getPreDefinedsByCriterial(this.app);
        this.preDefinedFieldController.addPreData(this.app);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map