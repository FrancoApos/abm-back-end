import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) 
  identificacion: string;

  @ManyToOne(() => Usuario, { onDelete: "CASCADE" }) 
  @JoinColumn({ name: "usuarioId" }) 
  usuario: Usuario;

  @Column()
  nombreCompleto: string;

  @Column({ nullable: true })
  edad: number;

  @Column({ nullable: true })
  genero: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ default: false })
  maneja: boolean;

  @Column({ default: false })
  usaLentes: boolean;

  @Column({ default: false })
  diabetico: boolean;

  @Column({ nullable: true })
  otraEnfermedad: string;
}
