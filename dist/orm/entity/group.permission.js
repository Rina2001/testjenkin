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
// for page cotroller in front end you can get from tblPreData : criterial :PagePermission
let Permission = class Permission extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Permission.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column({
        type: "text",
        nullable: true
    }),
    __metadata("design:type", String)
], Permission.prototype, "pageName", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    __metadata("design:type", String)
], Permission.prototype, "isView", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    __metadata("design:type", String)
], Permission.prototype, "isAdd", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    __metadata("design:type", String)
], Permission.prototype, "isDelete", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    __metadata("design:type", String)
], Permission.prototype, "isUpdate", void 0);
__decorate([
    typeorm_1.Column({
        type: "text",
        nullable: true
    }),
    __metadata("design:type", String)
], Permission.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // @ManyToMany(type=>Group,group=>group.groupPermission)
    // group:Group[]
    // @OneToMany(type=>Permission)
    //  @JoinTable()
    // permission:Permission[]
    )
], Permission.prototype, "created", void 0);
Permission = __decorate([
    typeorm_1.Entity("tblPermission")
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=group.permission.js.map