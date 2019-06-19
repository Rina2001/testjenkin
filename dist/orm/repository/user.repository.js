"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("typeorm");
//import { DriverVehicleDetailRepository } from './vehicleDriver.repository';
const base_controller_1 = require("../../controller/base.controller");
const responseBody_1 = require("./responseBody");
/**
 * @Rina Chen
 */
let UserRepository = class UserRepository extends typeorm_1.Repository {
    /**
     * @method findByUsername
     * @param userName
     */
    findByUsername(userName) {
        try {
            return this.findOne({ userName });
        }
        catch (error) {
            console.log("UserRepository -> findByUsername " + error);
            return Promise.resolve(error);
        }
    }
    /**
     * @method findUserByID
     * @param ID
     */
    findUserByID(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.createQueryBuilder("user")
                    .innerJoinAndSelect("user.group", "group")
                    .innerJoinAndSelect("group.groupPermission", "permission")
                    .where("user.ID=:ID and user.status='1'", { ID: ID })
                    .getOne()
                    .then(x => {
                    let res = new responseBody_1.ResponseBody();
                    res.body = [x];
                    res.status = base_controller_1.Status.success;
                    return Promise.resolve(res);
                })
                    .catch(error => {
                    let resBody = new responseBody_1.ResponseBody();
                    resBody.status = base_controller_1.Status.server_error;
                    resBody.body = [error.message];
                    return Promise.resolve(resBody);
                });
            }
            catch (error) {
                console.log("UserRepository->findById " + error);
                let resBody = new responseBody_1.ResponseBody();
                resBody.status = base_controller_1.Status.server_error;
                resBody.body = [error.message];
                return Promise.resolve(resBody);
            }
        });
    }
    /**
     * @method updateUser
     * @param user
     */
    updateUser(user) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            this.update(user.ID, {
                userImage: user.userImage,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dob: user.dob,
                telephone1: user.telephone1,
                telephone2: user.telephone2,
                nationalIDCard: user.nationalIDCard,
                city: user.city,
                province: user.province,
                district: user.district,
                commune: user.commune,
                village: user.village,
                userType: user.userType
            })
                .then(res => {
                resBody.body = ["1"];
                resBody.status = base_controller_1.Status.success;
                return Promise.resolve(resBody);
            })
                .catch(err => {
                resBody.body = [err.message];
                resBody.status = base_controller_1.Status.logic_error;
                return Promise.resolve(resBody);
            });
        }
        catch (error) {
            resBody.body = [error];
            resBody.status = base_controller_1.Status.server_error;
            return Promise.resolve(resBody);
        }
    }
    /**
     * @method updateUsernamePassword
     * @param user : {ID:number,userName:string,password:any}
     */
    updateUsernamePassword(user) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            this.update(user.ID, {
                userName: user.userName,
                password: user.password
            })
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
        }
        catch (error) {
            console.log("UserRepository->updateUsernamePassword " + error);
            resBody.body = [error];
            resBody.status = base_controller_1.Status.server_error;
            return Promise.resolve(resBody);
        }
    }
    /**
     * @method addUser
     * @param user
     *
     */
    addUser(user) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            return typeorm_1.getManager().transaction(transactionalEntityManager => {
                user.created = new Date();
                user.status = 1;
                return this.save(user)
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
            resBody.status = base_controller_1.Status.server_error;
            resBody.body = [error.message];
            return Promise.resolve(resBody);
        }
    }
    /**
     * @method getListUsers
     * @param pageIndex
     * @param pageSize
     */
    getListUsers(pageIndex, pageSize) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            resBody.status = base_controller_1.Status.success;
            return this.createQueryBuilder("user")
                .skip(pageIndex)
                .take(pageSize)
                .where("user.status='1'")
                .getMany().then(x => {
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
    /**
     * @method getListUsersByType
     */
    getListUsersByType(userType) {
        let resBody = new responseBody_1.ResponseBody();
        try {
            resBody.status = base_controller_1.Status.success;
            return this.createQueryBuilder("user")
                .select("user.ID")
                .addSelect("user.userName")
                .where("user.status='1' and user.userType=:userType", { "userType": userType })
                .getMany().then(x => {
                let rr = new responseBody_1.ResponseBody();
                rr.body = x;
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
    /**
     * @@method getCountUsers
     */
    getCountUsers() {
        try {
            return this.createQueryBuilder("user").getCount().then(x => {
                let res = new responseBody_1.ResponseBody();
                res.status = base_controller_1.Status.success;
                res.body = [x];
                return Promise.resolve(res);
            });
        }
        catch (error) {
            let res = new responseBody_1.ResponseBody();
            res.status = base_controller_1.Status.server_error;
            res.body = [error];
            return Promise.resolve(res);
        }
    }
    /**
     * @method removeUserByID
     * @param ID
     */
    removeUserByID(ID) {
        try {
            return this.update(ID, {
                status: 0,
            }).then(x => {
                let affectedRows = x.raw.affectedRows;
                let res = new responseBody_1.ResponseBody();
                res.status = affectedRows == 1 ? base_controller_1.Status.success : base_controller_1.Status.logic_error;
                return Promise.resolve(res);
            });
        }
        catch (error) {
            console.log("UserRepository->updateUser " + error);
            let res = new responseBody_1.ResponseBody();
            res.status = base_controller_1.Status.server_error;
            res.body = [error];
            return Promise.resolve(res);
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map