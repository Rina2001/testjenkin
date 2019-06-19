"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../entity/customer.entity");
const responseBody_1 = require("./responseBody");
const base_controller_1 = require("controller/base.controller");
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    updateCustomerByID(customer) {
        // block customer 
        return this.update(customer.ID, {
            firstName: customer.firstName,
            lastName: customer.lastName,
            gender: customer.gender,
            dob: customer.dob,
            telephone1: customer.telephone1,
            telephone2: customer.telephone2,
            // latitude:customer.latitude,
            // longtitude:customer.longtitude,
            city: customer.city,
            province: customer.province,
            district: customer.district,
            village: customer.village,
            steetNo: customer.steetNo,
            homeNo: customer.homeNo
        })
            .then(res => {
            let response = new responseBody_1.ResponseBody();
            response.body = ["1"];
            response.status = base_controller_1.Status.success;
            return Promise.resolve(response);
        })
            .catch(err => {
            console.log(err);
            let response = new responseBody_1.ResponseBody();
            response.body = [err];
            response.status = base_controller_1.Status.logic_error;
            return Promise.resolve(response);
        });
    }
    addCustomer(customer) {
        try {
            return;
            this.save(customer).then(res => {
                let response = new responseBody_1.ResponseBody();
                response.body = ["1"];
                response.status = base_controller_1.Status.success;
                return Promise.resolve(response);
            });
        }
        catch (error) {
            console.log("CustomerRepository -> addCustomer" + error);
            return Promise.resolve(error);
        }
    }
};
CustomerRepository = __decorate([
    typeorm_1.EntityRepository(customer_entity_1.Customer)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map