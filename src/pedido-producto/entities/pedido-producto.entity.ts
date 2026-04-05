import { Pedido } from "../../pedido/entities/pedido.entity";
import { Producto } from "../../producto/entities/producto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedido_productos')
export class PedidoProducto {

    @PrimaryGeneratedColumn()
    id_pediProd: number;

    @ManyToOne(() => Pedido, pedido => pedido.productos)
    pedido: Pedido;


    @ManyToOne(() => Producto, { eager: true , onDelete: 'RESTRICT'})
    producto: Producto;

    @Column('int')
    cantidad: number;

    @Column('decimal', { precision: 10, scale: 2 })
    precioUnitario: number;
}
