import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity("tblDriverVehicleDetail")
export class DriverVehicleDetail extends BaseEntity{
    @PrimaryGeneratedColumn()
    ID:number;

    // @Column({nullable:false})
    // userID:number;

    @Column({
        type: "varchar",
        width:10,   
        nullable:false
    })
    numberPlate:String;

    @Column({
        type: "int",
        nullable:false
       })
    weight:number;

    @Column({nullable:false})
    vehicleType:number;

    @Column({
        type:"varchar",
        width:20,   
        nullable:false
    })
    color:String;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createDate:Date;


    @Column({type:"int",default:()=>1,nullable:true})
    isActive:number

}