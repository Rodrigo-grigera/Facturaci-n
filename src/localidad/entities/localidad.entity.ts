import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('localidad')
export class Localidad {
    @PrimaryGeneratedColumn()
    id_localidad : number;

    @Column()
    nombre: string;

    @OneToMany(()=> Cliente, cliente => cliente.localidad)
    clientes: Cliente[];

}
