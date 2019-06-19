import { PreDefinedField } from '../entity/preDefinedField.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ResponseBody } from './responseBody';
import { Status } from '../../controller/base.controller';

@EntityRepository(PreDefinedField)
export class PreDefinedFieldRepository extends Repository<PreDefinedField>{
    public getPreDefinedsByCriterial(criterial){
          let response =new  ResponseBody<any>()
          return this.createQueryBuilder("pre")
                 .select("pre.ID")
                 .addSelect("pre.criterial")
                 .addSelect("pre.value")
                 .where("pre.criterial=:criterial",{"criterial":criterial})
                 .getMany()
                 .then(qb=>{
                     response.body=qb
                     response.status=Status.success
                     return Promise.resolve(response)
                 })
                 .catch(err=>{
                    response.body=[err.message]
                    response.status=Status.logic_error
                    return Promise.resolve(response)
                 })
    }

   addPreData(data:PreDefinedField[]){
    let response =new  ResponseBody<any>()
    return this.save(data)
           .then(qb=>{
               response.body=[]
               response.status=Status.success
               return Promise.resolve(response)
           })
           .catch(err=>{
              response.body=[err.message]
              response.status=Status.logic_error
              return Promise.resolve(response)
           })
   }
} 