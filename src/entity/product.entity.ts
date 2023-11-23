import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  isAvailable: boolean;

  @CreateDateColumn()
  createdAt: Date;
}


