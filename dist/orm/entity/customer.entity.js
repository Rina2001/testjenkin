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
let Customer = class Customer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Customer.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Customer.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        type: "text",
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 2,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date',
        nullable: true
    }),
    __metadata("design:type", Date)
], Customer.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 12,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "telephone1", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 12,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "telephone2", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 45,
        nullable: true
    }),
    __metadata("design:type", String)
], Customer.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 45,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "province", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 45,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "district", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 45,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "commune", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 45,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "village", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 10,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "steetNo", void 0);
__decorate([
    typeorm_1.Column({
        type: "nvarchar",
        length: 10,
        nullable: false
    }),
    __metadata("design:type", String)
], Customer.prototype, "homeNo", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Customer.prototype, "createDate", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: () => 1, nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "isActive", void 0);
Customer = __decorate([
    typeorm_1.Entity({ name: "tblCustomer" })
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map