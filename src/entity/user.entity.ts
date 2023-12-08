
import { Roles } from "src/enum/role";
import { Column, Entity } from "typeorm";
import {BaseEntity} from "./base.entity"



@Entity('User')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable: true})
  middleName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.user,
  })
  role: Roles;
}




