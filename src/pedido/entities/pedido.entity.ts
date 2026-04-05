import { Cliente } from "../../cliente/entities/cliente.entity";
import { PedidoProducto } from "../../pedido-producto/entities/pedido-producto.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id_pedido: number;

   
    @ManyToOne(() => Cliente, cliente => cliente.pedidos, { eager: true , onDelete: 'SET NULL' })
    cliente: Cliente;


    @OneToMany(() => PedidoProducto, pedipro => pedipro.pedido, { cascade: true, eager: true })
    productos: PedidoProducto[];

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    total: number;

    @CreateDateColumn()
    createdAt: Date;
  
}

