import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Collaborator from "./Collaborator";

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

	@OneToMany(
		() => Collaborator,
		(collaborator) => collaborator.user,
	)
	collaborators: Collaborator[];
}

export default User;
