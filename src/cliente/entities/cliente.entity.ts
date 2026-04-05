import { Localidad } from "../../localidad/entities/localidad.entity";
import { Pedido } from "../../pedido/entities/pedido.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id_cliente : number;

    @Column({type:'varchar', length: 200})
    nombre : string;
     
    @Column({type:'varchar', length:200})
    apellido : string;
    
    @Column({type:'int', nullable: true})
    celular? : number;
    
    @Column({length: 250, nullable: true})
    direccion? : string;

    @ManyToOne(() => Localidad, localidad => localidad.clientes, { eager: true, nullable: true })
    localidad?: Localidad;

    @OneToMany(()=> Pedido, pedido => pedido.cliente)
    pedidos : Pedido [];
}
