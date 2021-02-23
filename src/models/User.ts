import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('user')
class User {

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @CreateDateColumn()
    createdAt: Date

}

export default User