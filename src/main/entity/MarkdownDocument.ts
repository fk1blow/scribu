import { Project } from './Project'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm'

@Entity()
export class MarkdownDocument {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  body: string

  @Column('text', { default: () => new Date().getTime() })
  created_at: string

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[]
}
