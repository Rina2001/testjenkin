import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "tblCustomer"})
export class Customer {

   @PrimaryGeneratedColumn()
   ID:number;

   @Column("text")
   firstName:String;

   @Column({
    type: "text", 
    nullable:false
   })
   lastName:String;

   @Column({
    type: "nvarchar",
    length:2,   
    nullable:false
   })
   gender:String; // M / F

   @Column({
    type: 'date',
    nullable:true
   })
   dob:Date;

   @Column({
    type: "nvarchar",
    length:12,   
    nullable:false
   })
   telephone1:String;

   @Column({
    type: "nvarchar",
    length:12,   
    nullable:false
   })
   telephone2:String;

//    @Column({
//     type: 'decimal'
//    })
//    latitude:number;

//    @Column({
//     type: 'decimal'
//    })
//    longtitude:number;

   @Column({
    type: "nvarchar",
    length:45,   
    nullable:true
   })
   city:String;
   
   @Column({
    type: "nvarchar",
    length:45,   
    nullable:false
   })
   province:String;

   @Column({
    type: "nvarchar",
    length:45,   
    nullable:false
   })
   district:String;

   @Column({
    type: "nvarchar",
    length:45,   
    nullable:false
   })
   commune:String;

   @Column({
    type: "nvarchar",
    length:45,   
    nullable:false
   })
   village:String;

   @Column({
    type: "nvarchar",
    length:10,   
    nullable:false
   })
   steetNo:String;

   @Column({
    type: "nvarchar",
    length:10,   
    nullable:false
   })
   homeNo:String;

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
   createDate:String;

   @Column({type:"int",default:()=>1,nullable:true})
   isActive:number


   

}