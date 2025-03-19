import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './persona.entity';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Persona)
        private readonly personaRepository: Repository<Persona>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async findByDNI(identificacion: string): Promise<Persona | null> {
        return await this.personaRepository.findOne({
            where: { usuario: { identificacion } }, 
            relations: ['usuario'],
        });
    }
    

    async createOrUpdate(identificacion: string, personaData: Partial<Persona>): Promise<Persona> {
        if (!identificacion) {
            throw new Error("❌ Error: La identificación es obligatoria.");
        }
    
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { identificacion } });
            if (!usuario) {
                throw new Error(`❌ Error: El usuario con identificación ${identificacion} no existe.`);
            }
    
            let persona = await this.personaRepository.findOne({ where: { identificacion } });
    
            if (persona) {
                await this.personaRepository.update({ identificacion }, { ...personaData, usuario });
                persona = await this.personaRepository.findOne({ where: { identificacion } });
            } else {
                persona = this.personaRepository.create({ ...personaData, identificacion, usuario });
                await this.personaRepository.save(persona);
            }
    
            console.log("✅ Persona guardada correctamente en la BD:", persona);
            return persona;
        } catch (error) {
            console.error("❌ Error al guardar en la base de datos:", error);
            throw new Error("Error al guardar la persona en la base de datos.");
        }
    }
    
    


    async deleteByDNI(identificacion: string): Promise<void> {
        try {
            
            await this.personaRepository
                .createQueryBuilder()
                .delete()
                .from(Persona)
                .where("identificacion = :identificacion", { identificacion })
                .execute();
    
            // 🔹 Luego, eliminar el usuario
            await this.usuarioRepository
                .createQueryBuilder()
                .delete()
                .from(Usuario)
                .where("identificacion = :identificacion", { identificacion })
                .execute();
    
            console.log(`✅ Usuario y Persona con DNI ${identificacion} eliminados correctamente.`);
        } catch (error) {
            console.error("❌ Error al eliminar usuario y persona:", error);
            throw new Error("Error al eliminar usuario y persona.");
        }
    }
}


