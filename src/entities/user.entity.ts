import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { Role } from './role.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar', name: 'email' })
  email: string

  @Column({ type: 'varchar', name: 'password' })
  password: string

  @Column({ type: 'int', name: 'token_validation', nullable: true })
  tokenValidation: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @OneToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roleId: number

  constructor(user?: Partial<User>) {
    Object.assign(this, user)
  }
}
