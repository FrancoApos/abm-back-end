import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona.entity';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([Persona, Usuario])],
    controllers: [PersonaController],
    providers: [PersonaService],
    exports: [PersonaService], 
  })
  export class PersonaModule {}





