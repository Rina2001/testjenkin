import { Request, Response} from "express";
import { baseController } from './base.controller';
import { User } from 'orm/entity/user.entity';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../orm/repository/user.repository';
import { ClientOAuth2Repository } from '../orm/repository/Oauth2Repository';
import passport = require('passport');

export class UserController extends baseController{
  
    constructor(){
        super()
        this.controllerName="/User/"
    }

    /**
    * @method getListUsers
    * @param app 
    */
   public addUsers(app):void{
    app
    .post(this.controllerName+"addUsers",
    //    passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
        let user = req.body
        getCustomRepository(UserRepository).addUser(user).then(
            qb =>{res.send(qb)}
        ) 
     })
   }


   /**
    * @method getListUsers
    * @param app 
    */
   public getListUsers(app):void{
    app
    .post(this.controllerName+"getListUsers",
        passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
        let pageIndex = req.body.pageIndex
        let pageSize = req.body.pageSize
        getCustomRepository(UserRepository).getListUsers(pageIndex,pageSize).then(
            qb =>{res.send(qb)}
        ) 
     })
   }


   
   /**
    * @method : getListUsersByType
    * @param app 
    */
   public getListUsersByType(app):void{
    app
    .post(this.controllerName+"getListUsersByType",
        passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
        let userType = req.body.userType
        console.log(userType)
        getCustomRepository(UserRepository).getListUsersByType(userType).then(
            qb =>{res.send(qb)}
        ) 
     })
   }




   /**
    * @method getCountUser
    * @param app 
    */
   public getCountUsers(app):void{
    app
    .post(this.controllerName+"getCountUsers",
       // passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
        getCustomRepository(UserRepository).getCountUsers()
        .then(
            qb =>{ res.send(qb)}
        ) 
     })
   }

   /**
    * @method 
    */
   public findUserByID(app):void{
    app
    .post(this.controllerName+"findUserByID",
       // passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
            let ID = req.body.ID;
        getCustomRepository(UserRepository).findUserByID(ID)
        .then(
            qb =>{
                res.send(qb)
            }
        ) 
     })
   }

   /**
    * @method removeUserByID
    * @param userID
    */
   public removeUserByID(app):void{
    app
    .post(this.controllerName+"removeUserByID",
       // passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
            let ID = req.body.ID;
        getCustomRepository(UserRepository).removeUserByID(ID)
        .then(
            qb =>{res.send(qb)}
        ) 
     })
   }



   // outhorization setting
   /**
    * @method removeUserByID
    * @param userID
    */
   public addClientAuhtorization(app):void{
    app
    .post(this.controllerName+"addClientAuhtorization",
       // passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
            let u = req.body;
        getCustomRepository(ClientOAuth2Repository).addClientAuhtorization(u)
        .then(
            qb =>{res.send(qb)}
        ) 
     })
   }


}