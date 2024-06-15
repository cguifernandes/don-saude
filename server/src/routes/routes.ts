import { Router } from "express";
import { setUsersController } from "../database/controller/UserController";

const routers = Router();

routers.post("/api/users", setUsersController);

export default routers;
