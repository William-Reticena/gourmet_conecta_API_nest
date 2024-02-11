import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { User } from './user.entity'

@Entity({ name: 'address' })
export class Address {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'enum', name: 'type', enum: ['residential', 'commercial', 'delivery'], nullable: true })
  type: string | null

  @Column({ type: 'boolean', name: 'active_for_delivery' })
  activeForDelivery: boolean

  @Column({ type: 'varchar', name: 'street' })
  street: string

  @Column({ type: 'int', name: 'number' })
  number: number

  @Column({ type: 'varchar', name: 'complement', nullable: true })
  complement: string | null

  @Column({ type: 'varchar', name: 'neighborhood' })
  neighborhood: string

  @Column({ type: 'varchar', name: 'city' })
  city: string

  @Column({ type: 'varchar', name: 'state' })
  state: string

  @Column({ type: 'varchar', name: 'country' })
  country: string

  @Column({ type: 'varchar', name: 'zip_code' })
  zipCode: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: User
}
