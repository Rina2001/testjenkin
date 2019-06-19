import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { DriverVehicleDetail } from './driverVehicleDetail.entity';
import { Group } from './group.entity';

@Entity("tblUser")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID : number
   
    @Column({
        type: "text",
        nullable:true
       })
    userName:String

    @Column({
        type: "text",
        nullable:true,
        select: false
       })
    password:String

    
    @Column({
        type: "text",
        nullable:true
       })
    userImage:String

    @Column({
        type: "text",
        nullable:false
    })
    firstName:String

    @Column({
        type: "varchar",
        length :100,   
        nullable:false
       })
    lastName:String

    @Column({
        type: "varchar",
        length :2,   
        nullable:false
    })
    gender:String

   
    @Column({type:"date",nullable: false})
    dob:Date

    @Column({
        type: "varchar",
        length :12,   
        nullable:false
       })
    telephone1:String

    @Column({
        type: "varchar",
        length :12,   
        nullable:false
       })
    telephone2:String

    @Column({
        type: "varchar",
        length :45,   
        nullable:false
       })
    nationalIDCard:String


    @Column({
        type: "varchar",
        length :45,   
        nullable:true
       })
    city:String

    @Column({
        type: "varchar",
        length :45,   
        nullable:false
       })
    province:String
    
    @Column({
        type: "varchar",
        length :45,   
        nullable:false
       })
    district:String

    @Column({
        type: "varchar",
        length :45,   
        nullable:false
       })
    commune:String
    
    @Column({
        type: "varchar",
        length :45,   
        nullable:false
       })
    village:String

    @Column({
        nullable:false
       })
    userType:number

    @Column({
        type: "nvarchar",
        length: 2
       })
       LengthOfService:number

    @Column({
        type: "nvarchar",
        length: 100,
        nullable:false
    })
        organization:String

    @Column({nullable:false})
        groupID:Number


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created:Date

    @Column({default:()=>1,nullable:true})
    status:number
    
    @ManyToOne(type=>Group)
    @JoinColumn({name:"groupID"})
    group:Group


}