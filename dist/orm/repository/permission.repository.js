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
const group_permission_1 = require("../entity/group.permission");
/**
 * @Rina Chen
 */
let PermissionRepository = class PermissionRepository extends typeorm_1.Repository {
    addNewPermission(groupPersmission) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            return typeorm_1.getManager().transaction(transactionalEntityManager => {
                return this.save(groupPersmission)
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
        catch (err) {
            resBody.status = base_controller_1.Status.logic_error;
            resBody.body = [err.message];
            return Promise.resolve(resBody);
        }
    }
};
PermissionRepository = __decorate([
    typeorm_1.EntityRepository(group_permission_1.Permission)
], PermissionRepository);
exports.PermissionRepository = PermissionRepository;
//# sourceMappingURL=permission.repository.js.map