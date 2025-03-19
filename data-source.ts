import { DataSource } from "typeorm";
import { Persona } from "./src/persona/persona.entity";
import { Usuario } from "./src/usuario/usuario.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'abm_db',
      entities: [Persona, Usuario],
    migrations: ["src/migrations/*.ts"], 
    synchronize: false,  
    logging: true,
});

AppDataSource.initialize()
    .then(() => console.log("📌 Base de datos conectada"))
    .catch((err) => console.error("❌ Error al conectar la base de datos:", err));
