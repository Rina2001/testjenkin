import * as express from "express";
import * as bodyParser from "body-parser";
import { createConnection, getCustomRepository, getRepository } from 'typeorm';
import { UserController } from './controller/user.controller';
import { PreDefinedFieldController } from "./controller/pre_defined.controller";
import * as oauth2 from './authorization/oauth2';
import { Token } from './authorization/token';
import { GroupPermissionController } from './controller/group.permission.controller';
import passport = require('passport');
import auth = require("./authorization/auth")

/**
 * Scripter  : Rina Chen :>
 */
class App {

    public app: express.Application
    public token=new Token()

    public userController:UserController = new UserController()
    public usrGrpPermisController = new GroupPermissionController() 
    public preDefinedFieldController:PreDefinedFieldController=new PreDefinedFieldController()
    constructor() {
        this.app = express();
        this.config();    
        // inititalize database
        this.initDatabase()
        // API 
               this.authorizationServer()
            //1/ USE
                this.getUserController()
            //2/ Permission
                this.groupPermissionController()
            //2/     
                this.getPredefinedFieldController()

    }    

    private config(): void{
        // serving static files 
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
      //  this.sessionManager()
    }

    authorizationServer(){
        auth
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.get('/dialog/authorize',           oauth2.authorization);
        this.app.post('/dialog/authorize/decision', oauth2.decision);
        this.app.post('/oauth/token',               oauth2.token);
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
    private initDatabase(){
        createConnection().then(async connection => {
            await connection.runMigrations()
             console.log("ORM connected");
         }).catch(error => {
            console.log(error)
         });
    }
    /**
     * @controller  getUserController
     */
    private getUserController(){
       
       // this.userController.addNewUser(this.app)
        this.userController.addUsers(this.app)
        this.userController.getListUsers(this.app)
        this.userController.getListUsersByType(this.app)
        this.userController.getCountUsers(this.app)
        this.userController.findUserByID(this.app)
        this.userController.removeUserByID(this.app)
        
        //authorization setting
        this.userController.addClientAuhtorization(this.app)

    }

    private groupPermissionController(){
        this.usrGrpPermisController.getPermissionByGroupID(this.app)
        this.usrGrpPermisController.updateGroupPermission(this.app)
        this.usrGrpPermisController.addNewGroupPermission(this.app)
    }


    /**
     * @controller getPredefinedFieldController
     */
    private getPredefinedFieldController(){
        this.preDefinedFieldController.getPreDefinedsByCriterial(this.app)
        this.preDefinedFieldController.addPreData(this.app)
    }

}

export default new App().app;