import { Roles } from "src/enum/role";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column()
  middleName: string;

  @Column({
    unique:true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default:Roles.user
  })
  role:Roles
}




