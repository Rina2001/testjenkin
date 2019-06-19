import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity("tblClientOauth2")
export class ClietnOuath2{


    @PrimaryGeneratedColumn()
    ID:Number

    @Column({
        type:"text",
        nullable:false
    })
    name:String

    @Column({
        type:"text",
        nullable:false
    })
    clientID:String

    @Column({
        type:"text",
        nullable:false
    })
    clientSecret:String


    @Column({
        type:"text",
        nullable:false
    })
    scope:String

    @Column({
        nullable:false,
        default:()=>false
    })
    trustedClient:boolean

    @Column({type:"int",default:()=>1,nullable:true})
    isActive:number
    

    @Column({type:"timestamp",default:()=>"CURRENT_TIMESTAMP"})
    created:Date


    


}