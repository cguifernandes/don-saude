import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { nullable: false })
	email: string;

	@Column("varchar", { nullable: false })
	password: string;

	@Column({ default: false })
	rememberMe: boolean;
}

export default User;
