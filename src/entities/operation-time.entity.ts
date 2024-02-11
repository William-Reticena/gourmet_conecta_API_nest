import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { Restaurant } from './restaurant.entity'

@Entity({ name: 'operation_time' })
export class OperationTime {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'varchar', name: 'day_of_week' })
  dayOfWeek: string

  @Column({ type: 'time', name: 'opening_time' })
  openingTime: Date

  @Column({ type: 'time', name: 'closing_time' })
  closingTime: Date

  @Column({ type: 'time', name: 'breaking_start_time', nullable: true })
  breakingStartTime: Date

  @Column({ type: 'time', name: 'breaking_end_time', nullable: true })
  breakingEndTime: Date

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn({ name: 'restaurant_id' })
  restaurantId: Restaurant
}
