import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text', { default: () => new Date().getTime()})
    created_at: string;

}
