import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservation";
import { Address } from "./Address";
import { createEncryptionPassword } from "../../utils/encryptionPassword";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({nullable: true})
    role?: string;

    @OneToOne(() => Address, {nullable: true, eager: true})
    @JoinColumn({name: "address_id"})
    address?: Address

    @OneToMany(() => Reservation, reservation => reservation.user, {eager: true})
    reservations!: Reservation[];


    constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, role?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
    }

    @BeforeInsert()
    @BeforeUpdate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private async encryptionPassword(password: string){
        this.password = createEncryptionPassword(this.password);

    }
    

}

