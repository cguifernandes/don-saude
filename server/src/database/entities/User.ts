import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { length: 32, nullable: false })
	email: string;

	@Column("varchar", { nullable: false })
	password: string;

	@Column({ default: false })
	rememberMe: boolean;
}

export type UserProps = Partial<Pick<User, keyof User>>;
export default User;
