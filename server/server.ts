const express = require("express");
const cors = require("cors");
import { AppDataSource } from "./src/database/data-source";
import routers from "./src/routes/routes";
import "reflect-metadata";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

AppDataSource.initialize()
	.then(async () => {
		app.listen(3333, () => {
			console.log("Server iniciado na porta 3333");
			console.log();
		});
	})
	.catch((error) => {
		console.error("Erro durante a inicialização do Data Source:", error);
	});
