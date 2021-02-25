import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('surveys')
class Survey {
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date
}

export default Survey