import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { DriverVehicleDetail } from './driverVehicleDetail.entity';
import { Permission } from './group.permission';

@Entity("tblGroup")
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID : number
    
    @Column({
        type: "text",
        nullable:true
       })
    group:String

    @Column({
        type: "text",
        nullable:true
       })
    status:String

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created:Date

    @ManyToMany(type=>Permission)
    @JoinTable({name:"tblGroupPermission"})
    groupPermission:Permission[]

}