import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { Menu } from './menu.entity'

@Entity({ name: 'dish' })
export class Dish {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ type: 'varchar', name: 'name' })
  name: string

  @Column({ type: 'float', name: 'price' })
  price: number

  @Column({ type: 'text', name: 'ingredients', nullable: true })
  ingredients: string

  @Column({ type: 'varchar', name: 'photo_url', nullable: true })
  photoUrl: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Menu, (menu) => menu.id)
  @JoinColumn({ name: 'menu_id' })
  menuId: Menu
}
