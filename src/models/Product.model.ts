import { Column, Model , DataType, Table, Default } from "sequelize-typescript";


@Table({
    tableName:'products'
})

export class Product extends Model {

    @Column({
        type:DataType.STRING(100)
    })
    declare name: string

    @Column({
        type:DataType.FLOAT(6)
    })
    declare price: number

    @Default( true )
    @Column({
        type:DataType.BOOLEAN
    })
    declare availibility: boolean
}

export default Product