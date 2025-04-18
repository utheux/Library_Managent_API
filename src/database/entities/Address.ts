import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    constructor(street: string, number: string, neighborhood: string) {
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
    }
}