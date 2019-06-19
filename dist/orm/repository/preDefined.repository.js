"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const preDefinedField_entity_1 = require("../entity/preDefinedField.entity");
const typeorm_1 = require("typeorm");
const responseBody_1 = require("./responseBody");
const base_controller_1 = require("../../controller/base.controller");
let PreDefinedFieldRepository = class PreDefinedFieldRepository extends typeorm_1.Repository {
    getPreDefinedsByCriterial(criterial) {
        let response = new responseBody_1.ResponseBody();
        return this.createQueryBuilder("pre")
            .select("pre.ID")
            .addSelect("pre.criterial")
            .addSelect("pre.value")
            .where("pre.criterial=:criterial", { "criterial": criterial })
            .getMany()
            .then(qb => {
            response.body = qb;
            response.status = base_controller_1.Status.success;
            return Promise.resolve(response);
        })
            .catch(err => {
            response.body = [err.message];
            response.status = base_controller_1.Status.logic_error;
            return Promise.resolve(response);
        });
    }
    addPreData(data) {
        let response = new responseBody_1.ResponseBody();
        return this.save(data)
            .then(qb => {
            response.body = [];
            response.status = base_controller_1.Status.success;
            return Promise.resolve(response);
        })
            .catch(err => {
            response.body = [err.message];
            response.status = base_controller_1.Status.logic_error;
            return Promise.resolve(response);
        });
    }
};
PreDefinedFieldRepository = __decorate([
    typeorm_1.EntityRepository(preDefinedField_entity_1.PreDefinedField)
], PreDefinedFieldRepository);
exports.PreDefinedFieldRepository = PreDefinedFieldRepository;
//# sourceMappingURL=preDefined.repository.js.map