import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tblAccessTokenOauth2")
export class AccessTokenOauth2{
    @PrimaryGeneratedColumn()
    ID:number

    @Column({type:"text"})
    jti:String


    @Column({type:"text"})
    token:String

    @Column({type:"timestamp"})
    expirationDate:Date

    @Column({type:"text"})
    scope:String
    
    @Column({type:"text"})
    clientID:String

    @Column()
    userId:number

    @Column({type:"int",default:()=>1,nullable:true})
    isActive:number
    

}