import { Role } from "src/enums/role.enum";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;
  
    @Column({ type: 'varchar', length: 30 })
    name: string;
  
    @Column({ unique: true,type: 'varchar', length: 40 })
    email: string;

    @Column({ type: 'varchar' })
    @Exclude()
    password: string;

    @Column({
        type: "enum",
        enum: Role
    })
    role: Role
}