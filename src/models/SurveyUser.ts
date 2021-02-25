import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('surveys_users')
class SurveyUser {

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    id: string

    @Column()
    survey_id: string

    @Column()
    user_id: string

    @Column()
    value: number

    @CreateDateColumn()
    createdAt: Date

}

export default SurveyUser