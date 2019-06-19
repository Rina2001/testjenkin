import { Entity, Column, PrimaryGeneratedColumn, Code } from "typeorm";

@Entity("tblAuthorizationOauth2")
export class AuthorizationCodeOauth2 {
    @PrimaryGeneratedColumn()
    ID :number

    @Column({type:"text"})
    clientID:String

    @Column({type:"text"})
    code:String

    @Column({type:"text"})
    redirectUri:String

    @Column({type:"int"})
    userId:number

    @Column({type:"text"})
    scope:String

    @Column({type:"int",default:()=>1,nullable:true})
    isActive:number

}