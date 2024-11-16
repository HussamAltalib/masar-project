
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('Articles')
export class Article {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title: string 

    @Column()
    body: string

}
