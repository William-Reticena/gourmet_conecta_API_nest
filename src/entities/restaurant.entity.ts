import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { Address } from './address.entity'
import { User } from './user.entity'

@Entity({ name: 'restaurant' })
export class Restaurant {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'varchar', name: 'name' })
  name: string

  @Column({ type: 'varchar', name: 'phone' })
  phone: string

  @Column({ type: 'varchar', name: 'email' })
  email: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn({ name: 'address_id' })
  addressId: Address

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: User
}
