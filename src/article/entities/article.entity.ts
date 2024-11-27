import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    userId: number; // Foreign key reference to User entity
}