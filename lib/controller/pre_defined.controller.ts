import { baseController } from './base.controller';
import { PreDefinedFieldRepository } from '../orm/repository/preDefined.repository';
import { getCustomRepository } from 'typeorm';
import { Request,Response } from 'express';
/**
 * @Controller
 */
export class PreDefinedFieldController  extends baseController{
  
    constructor(){ 
        super()
        this.controllerName="/PreDefinedField/"
    }
     /**
    * @method getListPreDefinedsByCriterial
    * @param app 
    */
   public getPreDefinedsByCriterial(app):void{
    app
    .post(this.controllerName+"getPreDefinedsByCriterial",
       // passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
        let criterial = req.body.criterial
        getCustomRepository(PreDefinedFieldRepository).getPreDefinedsByCriterial(criterial).then(
            qb =>{res.send(qb)}
        )
     })
   }

 /**
    * @method addPreData
    * @param app 
    */
   public addPreData(app):void{
    app
    .post(this.controllerName+"addPreData",
       // passport.authenticate('bearer', { session: false }),
        (req: Request, res: Response) => {  
        let criterial = req.body;
        getCustomRepository(PreDefinedFieldRepository).addPreData(criterial).then(
            qb =>{res.send(qb)}
        )
     })
   }


}