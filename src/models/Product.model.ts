import { Column, Model , DataType, Table, Default } from "sequelize-typescript";


@Table({
    tableName:'products'
})

export class Product extends Model {
    @Column({
        type:DataType.STRING(100)
    })
    name: string

    @Column({
        type:DataType.FLOAT(6,2)
    })
    price: number

    @Default( true )
    @Column({
        type:DataType.BOOLEAN
    })
    availibility: boolean
}

export default Product