import bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  @Length(2, 32, { message: "사용자 이름은 두 글자 이상으로 입력해주세요." })
  username: string;

  @Exclude()
  @Column()
  @Length(8, 16, { message: "비밀번호는 8자 이상 16자 이하로 입력해주세요." })
  password: string;

  @Index()
  @IsEmail(undefined, {
    message: "잘못된 이메일 주소입니다. 다시 입력해주세요.",
  })
  @Length(1, 255, { message: "이메일 주소는 반드시 입력하셔야 합니다." })
  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
