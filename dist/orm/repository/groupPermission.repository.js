"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
//import { DriverVehicleDetailRepository } from './vehicleDriver.repository';
const base_controller_1 = require("../../controller/base.controller");
const responseBody_1 = require("./responseBody");
const group_entity_1 = require("../entity/group.entity");
const permission_repository_1 = require("./permission.repository");
/**
 * @Rina Chen
 */
let GroupPermissionRepository = class GroupPermissionRepository extends typeorm_1.Repository {
    addNewGroupPermission(grp) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            return typeorm_1.getManager().transaction(transactionalEntityManager => {
                // groupPersmission.created = new Date()
                return typeorm_1.getCustomRepository(permission_repository_1.PermissionRepository).addNewPermission(grp.groupPermission)
                    .then(x => {
                    return this.save(grp)
                        .then(res => {
                        resBody.status = base_controller_1.Status.success;
                        resBody.body = ["1"];
                        return Promise.resolve(resBody);
                    })
                        .catch(err => {
                        resBody.status = base_controller_1.Status.logic_error;
                        resBody.body = [err.message];
                        return Promise.resolve(resBody);
                    });
                });
            });
        }
        catch (err) {
            resBody.status = base_controller_1.Status.logic_error;
            resBody.body = [err.message];
            return Promise.resolve(resBody);
        }
    }
    updateGroupPermission(groupPermission) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            return typeorm_1.getManager().transaction(trnManger => {
                return this.update(groupPermission, groupPermission)
                    .then(res => {
                    resBody.status = base_controller_1.Status.success;
                    resBody.body = ["1"];
                    return Promise.resolve(resBody);
                })
                    .catch(err => {
                    resBody.status = base_controller_1.Status.logic_error;
                    resBody.body = [err.message];
                    return Promise.resolve(resBody);
                });
            });
        }
        catch (error) {
        }
    }
    /**
     * @method getPermissionByGroupID
     * @param groupID
     */
    getPermissionByGroupID(groupID) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            resBody.status = base_controller_1.Status.success;
            console.log(groupID);
            return this.createQueryBuilder("group")
                .innerJoinAndSelect("group.groupPermission", "permission")
                .where("group.ID = :ID", { ID: groupID })
                .getMany().then(x => {
                console.log(x);
                let rr = new responseBody_1.ResponseBody();
                rr.body = x;
                rr.status = base_controller_1.Status.success;
                return Promise.resolve(rr);
            })
                .catch(err => {
                let rr = new responseBody_1.ResponseBody();
                rr.body = [err];
                rr.status = base_controller_1.Status.success;
                return Promise.resolve(rr);
            });
        }
        catch (error) {
            console.log(error);
            resBody.status = base_controller_1.Status.server_error;
            resBody.body = [error];
            return Promise.resolve(resBody);
        }
    }
};
GroupPermissionRepository = __decorate([
    typeorm_1.EntityRepository(group_entity_1.Group)
], GroupPermissionRepository);
exports.GroupPermissionRepository = GroupPermissionRepository;
//# sourceMappingURL=groupPermission.repository.js.map