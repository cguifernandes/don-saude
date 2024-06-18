import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("collaborator")
class Collaborator {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", { length: 48, nullable: false })
	name: string;

	@Column("varchar", { length: 11, nullable: false })
	cpf: string;

	@Column("varchar", { nullable: false })
	tel: string;

	@Column("varchar", { nullable: false })
	email: string;

	@ManyToOne(
		() => User,
		(user) => user.collaborators,
	)
	user: User;
}

export default Collaborator;
