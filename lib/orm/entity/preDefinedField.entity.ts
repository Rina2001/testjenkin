import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';

@Entity("tblPreDefinedField")
export class PreDefinedField extends BaseEntity{
    @PrimaryGeneratedColumn()
    ID:number

    @Column({
        type: "varchar",
        length:45,   
        nullable:false
    })
    criterial:String 

    @Column({
        type: "varchar",
        length:100,   
        nullable:false
    })
    value:String

    @Column({nullable:true})
    rangColumn:number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createDate:Date

    @Column({type:"int",default:()=>1,nullable:true})
    status:number

}