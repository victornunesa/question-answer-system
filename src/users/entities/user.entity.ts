import { Role } from "src/enums/role.enum";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30 })
    name: string;
  
    @Column({ unique: true,type: 'varchar', length: 40 })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({
        type: "enum",
        enum: Role
    })
    role: Role
}