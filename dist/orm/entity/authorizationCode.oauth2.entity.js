"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let AuthorizationCodeOauth2 = class AuthorizationCodeOauth2 {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AuthorizationCodeOauth2.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], AuthorizationCodeOauth2.prototype, "clientID", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], AuthorizationCodeOauth2.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], AuthorizationCodeOauth2.prototype, "redirectUri", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], AuthorizationCodeOauth2.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], AuthorizationCodeOauth2.prototype, "scope", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: () => 1, nullable: true }),
    __metadata("design:type", Number)
], AuthorizationCodeOauth2.prototype, "isActive", void 0);
AuthorizationCodeOauth2 = __decorate([
    typeorm_1.Entity("tblAuthorizationOauth2")
], AuthorizationCodeOauth2);
exports.AuthorizationCodeOauth2 = AuthorizationCodeOauth2;
//# sourceMappingURL=authorizationCode.oauth2.entity.js.map