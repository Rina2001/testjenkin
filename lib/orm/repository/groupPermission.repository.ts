import { EntityRepository, Repository, getRepository, getCustomRepository, QueryBuilder, getManager, getConnectionManager, getConnection } from 'typeorm';
//import { DriverVehicleDetailRepository } from './vehicleDriver.repository';
import { Status } from '../../controller/base.controller';
import { ResponseBody } from './responseBody';
import { resolve } from 'path';
import { Permission } from '../entity/group.permission';
import { Group } from '../entity/group.entity';
import { PermissionRepository } from './permission.repository';

/**
 * @Rina Chen
 */
@EntityRepository(Group)
export class GroupPermissionRepository extends  Repository<Group>
{
    addNewGroupPermission(grp:Group){
        let resBody:ResponseBody<any> =new ResponseBody()
          try {
            return getManager().transaction(transactionalEntityManager=>{
               // groupPersmission.created = new Date()
              return getCustomRepository(PermissionRepository).addNewPermission(grp.groupPermission)
                    .then(x=>{
                        return  this.save(grp)
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
                
            })
          } catch (err) {
                resBody.status = Status.logic_error
                resBody.body = [err.message]
                return Promise.resolve(resBody)
          }
    }

    updateGroupPermission(groupPermission:Permission){
        let resBody:ResponseBody<any> =new ResponseBody()
        try {
            return getManager().transaction(trnManger=>{
                return this.update(groupPermission,groupPermission)
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
        } catch (error) {
            
        }
    }

    /**
     * @method getPermissionByGroupID
     * @param groupID 
     */
    getPermissionByGroupID(groupID){
        let resBody : ResponseBody<any> = new ResponseBody()
        try {
           resBody.status = Status.success
           console.log(groupID)
          return this.createQueryBuilder("group")
                     .innerJoinAndSelect("group.groupPermission","permission")
                     .where("group.ID = :ID",{ID:groupID})
                     .getMany().then(x=>{
                         console.log(x)
                        let rr : ResponseBody<any> = new ResponseBody()
                            rr.body = x
                            rr.status = Status.success
                            return Promise.resolve(rr)
                     })
                     .catch(err=>{
                        let rr : ResponseBody<any> = new ResponseBody()
                        rr.body = [err]
                        rr.status = Status.success
                        return Promise.resolve(rr)
                     });
        } catch (error) {
            console.log(error)
            resBody.status = Status.server_error
            resBody.body = [error]
            return Promise.resolve(resBody);
        }
    }



}