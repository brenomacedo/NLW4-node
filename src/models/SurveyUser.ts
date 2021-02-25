import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import Survey from "./Survey";
import User from "./User";

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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @Column()
    user_id: string

    @ManyToOne(() => Survey)
    @JoinColumn({ name: 'survey_id', referencedColumnName: 'id' })
    survey: Survey

    @Column()
    value: number

    @CreateDateColumn()
    createdAt: Date

}

export default SurveyUser