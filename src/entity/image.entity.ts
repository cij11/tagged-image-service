import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Tag } from './tag.entity'

@Entity()
export class Image {
    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    filename: string

    @Column('datetime')
    createdAt: Date

    @Column('datetime')
    modifiedAt: Date

    @ManyToMany(() => Tag, { eager: true }) // eager: true. Always return tags when getting image
    @JoinTable()
    tags: Tag[]
}
