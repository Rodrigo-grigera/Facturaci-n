import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('localidades')
export class Localidad {
    @PrimaryGeneratedColumn()
    id_localidad : number;

    @Column()
    nombre: string;

    @OneToMany(()=> Cliente, cliente => cliente.localidad, { onDelete: 'SET NULL' })
    clientes: Cliente[];

}
