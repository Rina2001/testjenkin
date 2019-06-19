import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { DriverVehicleDetail } from './driverVehicleDetail.entity';
import { Group } from './group.entity';


// for page cotroller in front end you can get from tblPreData : criterial :PagePermission
@Entity("tblPermission")
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID : number
    
    @Column({
        type: "text",
        nullable:true
    })
    pageName:String

    @Column({
        type: "int",
        nullable:true
       })
    isView:String


    @Column({
        type: "int",
        nullable:true
       })
    isAdd:String

    @Column({
        type: "int",
        nullable:true
       })
    isDelete:String

    @Column({
        type: "int",
        nullable:true
       })
    isUpdate:String

    @Column({
        type: "text",
        nullable:true
       })
    status:String

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created:Date

    // @ManyToMany(type=>Group,group=>group.groupPermission)
    // group:Group[]

    // @OneToMany(type=>Permission)
    //  @JoinTable()
    // permission:Permission[]

}