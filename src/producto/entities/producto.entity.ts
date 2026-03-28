import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('producto')

export class Producto {
    @PrimaryGeneratedColumn()
    id_producto : number;

    @Column({type:'varchar', length:250})
    nombre : string;

    @Column({type: 'text', nullable : true})
    descripcion : string;

    @Column('decimal' , {precision : 10, scale : 2})
    precio : number;

    @Column()
    disponible : boolean; 

    @Column({type:'int', default : 0})
    stock : number;

}
