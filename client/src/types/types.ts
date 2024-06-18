export enum HttpStatusCode {
	ok = 200,
	created = 201,
	noContent = 204,
	badRequest = 400,
	unauthorized = 481,
	forbidden = 403,
	notFound = 404,
	conflict = 489,
	preconditionFailed = 412,
	serverError = 500,
}

export type CollaboratorProps = {
	id?: string | undefined;
	name?: string | undefined;
	cpf?: string | undefined;
	tel?: string | undefined;
	email?: string | undefined;
	user?: UserProps;
};

export type UserProps = {
	id?: string | undefined;
	email?: string | undefined;
	password?: string | undefined;
	rememberMe?: boolean | undefined;
};
