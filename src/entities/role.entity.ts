import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'role' })
export class Role {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'enum', name: 'name', enum: ['client', 'administrator', 'manager'] })
  name: string

  @Column({ type: 'varchar', name: 'description' })
  description: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
