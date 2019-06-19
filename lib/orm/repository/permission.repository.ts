import { EntityRepository, Repository, getRepository, getCustomRepository, QueryBuilder, getManager, getConnectionManager, getConnection } from 'typeorm';
//import { DriverVehicleDetailRepository } from './vehicleDriver.repository';
import { Status } from '../../controller/base.controller';
import { ResponseBody } from './responseBody';
import { resolve } from 'path';
import { Permission } from '../entity/group.permission';
import { Group } from '../entity/group.entity';

/**
 * @Rina Chen
 */
@EntityRepository(Permission)
export class PermissionRepository extends  Repository<Permission>
{
    addNewPermission(groupPersmission:Permission[]){
        let resBody:ResponseBody<any> =new ResponseBody()
          try {
            return getManager().transaction(transactionalEntityManager=>{
              return  this.save(groupPersmission)
                           .then(res=>{
                                       resBody.status = Status.success
                                       resBody.body = ["1"]
                                               return Promise.resolve(resBody)
                                      })
                                       .catch(err=>{
                                                  resBody.status = Status.logic_error
                                                  resBody.body = [err.message]
                                                  return Promise.resolve(resBody)
                                       })
                
            })
          } catch (err) {
                resBody.status = Status.logic_error
                resBody.body = [err.message]
                return Promise.resolve(resBody)
          }
    }



}