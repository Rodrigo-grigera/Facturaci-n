import { Localidad } from "src/localidad/entities/localidad.entity";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id_cliente : number;

    @Column({type:'varchar', length: 200})
    nombre : string;
     
    @Column({type:'varchar', length:200})
    apellido : string;
    
    @Column({length:200, nullable: true})
    celular? : number;
    
    @Column({length: 250, nullable: true})
    direccion? : string;

    @ManyToOne(() => Localidad, localidad => localidad.clientes, { eager: true, nullable: true })
    localidad?: Localidad;

    @OneToMany(()=> Pedido, pedido => pedido.cliente)
    pedidos : Pedido [];
}
