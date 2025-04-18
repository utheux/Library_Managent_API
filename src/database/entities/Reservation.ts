import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity('Reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => Book, (book) => book.reservation, {eager: true})
    book: Book[];

    @CreateDateColumn()
    reservationDate: Date;

    @Column({type: "boolean", default: false})
    isReturned: boolean;

    constructor(user: User, books: Book[]){
        this.user = user;
        this.book = books;
        this.reservationDate = new Date();
        this.isReturned = false;

    }

    
}