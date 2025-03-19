import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findByDNI(identificacion: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { identificacion } });
  }

  
  async register(identificacion: string, password: string): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = this.usuarioRepository.create({ identificacion, password: hashedPassword });
    return await this.usuarioRepository.save(usuario);
  }

  async validateUser(identificacion: string, password: string): Promise<Usuario | null> {
    const user = await this.findByDNI(identificacion);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async deleteUser(identificacion: string): Promise<void> {
    await this.usuarioRepository.delete({ identificacion });
  }
}
