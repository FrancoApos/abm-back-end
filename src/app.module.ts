import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './persona/persona.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Persona } from './persona/persona.entity';
import { Usuario } from './usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'abm_db',
      entities: [Persona, Usuario], 
      migrations: ["dist/migrations/*.js"],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonaModule, 
    UsuarioModule,  
  ],
})
export class AppModule { }

