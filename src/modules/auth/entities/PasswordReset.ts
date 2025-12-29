import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("password_resets")
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  identifier!: string;

  @Column({ length: 6 })
  code!: string;

  @Column({ type: "timestamp" })
  expires_at!: Date;

  @CreateDateColumn()
  created_at!: Date;
}
