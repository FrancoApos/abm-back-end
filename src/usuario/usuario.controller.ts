import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PersonaService } from '../persona/persona.service';

@Controller('usuarios')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly personaService: PersonaService
    ) { }

    @Post('register')
    async register(@Body() { identificacion, password }: { identificacion: string; password: string }) {
        try {
            const usuarioExistente = await this.usuarioService.findByDNI(identificacion);
            if (usuarioExistente) {
                return { error: 'El usuario ya existe' };
            }

            const usuario = await this.usuarioService.register(identificacion, password);
            console.log("✅ Usuario registrado correctamente:", usuario);
            return usuario;
        } catch (error) {
            console.error('❌ Error en el registro:', error);
            return { error: 'No se pudo registrar el usuario.' };
        }
    }

    @Post('login')
    async login(@Body() { identificacion, password }: { identificacion: string; password: string }) {
        try {
            const user = await this.usuarioService.validateUser(identificacion, password);
            if (!user) {
                return { error: 'DNI o contraseña incorrecta' };
            }
            console.log("✅ Usuario autenticado:", user);
            return { message: 'Inicio de sesión exitoso', identificacion };
        } catch (error) {
            console.error('❌ Error en el login:', error);
            return { error: 'Error al procesar la autenticación' };
        }
    }

   
    @Get(':identificacion')
    async getUser(@Param('identificacion') identificacion: string) {
        try {
            const usuario = await this.usuarioService.findByDNI(identificacion);
            if (!usuario) {
                return { error: 'Usuario no encontrado' };
            }
            return usuario;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return { error: 'Error al obtener los datos del usuario.' };
        }
    }

  
    @Delete(':identificacion')
    async deleteUser(@Param('identificacion') identificacion: string) {
        try {
           
            const persona = await this.personaService.findByDNI(identificacion);
            if (persona) {
                await this.personaService.deleteByDNI(identificacion);
            }

            await this.usuarioService.deleteUser(identificacion);
            return { message: 'Usuario eliminado correctamente' };
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return { error: 'No se pudo eliminar el usuario.' };
        }
    }
}
