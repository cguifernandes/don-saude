import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

	@Column("varchar", { nullable: false })
	password: string;

	@Column("varchar", { nullable: false })
	nameFile: string;
}

export default Collaborator;
