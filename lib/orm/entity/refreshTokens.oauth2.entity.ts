import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tblRefreshTokenOauth2")
export class RefreshTokenOauth2{
    @PrimaryGeneratedColumn()
    ID:number

    @Column({type:"text"})
    token:String

    @Column()
    jti:String

    @Column({type:"date",nullable:true})
    expirationDate:String

    @Column({type:"text"})
    scope:String
    
    @Column({type:"text"})
    clientID:String

    @Column()
    userID:number

    @Column({type:"int",default:()=>1,nullable:true})
    isActive:number
    

}