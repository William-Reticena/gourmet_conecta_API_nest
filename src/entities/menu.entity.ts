import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { Restaurant } from './restaurant.entity'

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'varchar', name: 'name' })
  name: string

  @Column({ type: 'enum', name: 'category', enum: ['entrada', 'principal', 'sobremesa', 'bebida', 'salada', 'aperitivo', 'petisco', 'infantil', 'especial'] })
  category: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn({ name: 'restaurant_id' })
  restaurantId: Restaurant
}
