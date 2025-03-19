import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './persona.entity';
import { CreatePersonaDto } from "./dto/create-persona.dto";

@Controller('personas')
export class PersonaController {
    
    constructor(private readonly personaService: PersonaService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createOrUpdate(@Body() personaData: CreatePersonaDto) {  
        console.log("📩 Datos validados recibidos en el backend:", JSON.stringify(personaData, null, 2));

        try {
            const persona = await this.personaService.createOrUpdate(personaData.identificacion, personaData);
            console.log("✅ Persona guardada correctamente en la BD:", persona);
            return persona;
        } catch (error) {
            console.error("❌ Error al registrar los datos:", error.response ? error.response.data : error);
            return { error: "Error al guardar la persona en la base de datos." };
        }
    }

    @Get(':identificacion')
    async getPersona(@Param('identificacion') identificacion: string) {
        try {
            const persona = await this.personaService.findByDNI(identificacion);
            if (!persona) {
                return { error: 'No hay datos personales para este usuario.' };
            }
            return persona;
        } catch (error) {
            console.error('Error al obtener los datos personales:', error);
            return { error: 'No se pudo obtener la información.' };
        }
    }

    @Delete(':identificacion')
    async deletePersona(@Param('identificacion') identificacion: string) {
        try {
            await this.personaService.deleteByDNI(identificacion);
            return { message: 'Datos personales eliminados correctamente' };
        } catch (error) {
            console.error('Error al eliminar los datos personales:', error);
            return { error: 'No se pudo eliminar la información.' };
        }
    }
}
