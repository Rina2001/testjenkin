import { baseController } from './base.controller';
import { GroupPermissionRepository } from '../orm/repository/groupPermission.repository';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import passport = require('passport');
export class GroupPermissionController extends baseController {
    constructor(){
        super()
        this.controllerName="/GroupPermission/"
    }


    /**
     * @method getPermissionByGroupID
     * @param app 
     * 
     */
    getPermissionByGroupID(app){
        app
        .post(this.controllerName+"getPermissionByGroupID",
         //  passport.authenticate('bearer', { session: false }),
            (req: Request, res: Response) => {  
            let groupID = req.body.groupID
            getCustomRepository(GroupPermissionRepository).getPermissionByGroupID(groupID).then(
                qb =>{res.send(qb)}
            ) 
         })  
    }


    /**
     * @method addNewGroupPermission
     * @param app 
     * 
     */
    addNewGroupPermission(app){
        app
        .post(this.controllerName+"addNewGroupPermission",
          // passport.authenticate('bearer', { session: false }),
            (req: Request, res: Response) => {  
            let groupPersmissions = req.body
            getCustomRepository(GroupPermissionRepository).addNewGroupPermission(groupPersmissions).then(
                qb =>{res.send(qb)}
            ) 
         })  
    }

    /**
     * @method addNewGroupPermission
     * @param app 
     * 
     */
    updateGroupPermission(app){
        app
        .post(this.controllerName+"updateGroupPermission",
           passport.authenticate('bearer', { session: false }),
            (req: Request, res: Response) => {  
            let groupPersmissions = req.body
            getCustomRepository(GroupPermissionRepository).updateGroupPermission(groupPersmissions).then(
                qb =>{res.send(qb)}
            ) 
         })  
    }



}