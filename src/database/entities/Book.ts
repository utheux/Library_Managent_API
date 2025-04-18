import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservation";

@Entity('Books')
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Reservation, (reservation) => reservation.book, {nullable: true})
    @JoinColumn({name: 'reservation_id'})
    reservation!: Reservation | null;

    constructor(name:string, description:string ) {
        this.name = name;
        this.description = description;
    }
}