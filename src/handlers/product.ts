import { Request , Response } from "express"
import Product from '../models/Product.model';
import { check, validationResult } from "express-validator";

export const getProducts = async ( req : Request , res : Response )=> {

    const products = await Product.findAll({
        order:[
            ['price','ASC']
        ],
        attributes: { exclude: [ 'createdAt' , 'updatedAt' ] },
        limit : 10
    })
        res.json({ data : products })
    
}

export const getProductById = async ( req : Request , res : Response )=> {

    let errors = validationResult( req )
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() })
        return;
    }

        const { id } = req.params 
        const product = await Product.findByPk( id )

        if(!product){
            res.status(404).json({
                error: 'Producto no encontrado'
            })
            return
        }
        res.json( { data : product } )

}

export const createProduct = async ( req : Request , res : Response ) => {
    
    //validacion de los campos
    await check('name')
        .notEmpty().withMessage('el nombre del producto no puede ir vacio').run( req )

    await check('price')
        .isNumeric().withMessage('El valor no es numérico')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom( value => value > 0 ).withMessage('El precio debe ser mayor a 0')
        .run( req )
    
    let errors = validationResult( req )
        if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() })
            return;
        }    
    
        const product = await Product.create( req.body )
        res.status(201).json( { data : product } )
    

}

export const updateProduct = async ( req : Request , res : Response )=> {

    await check('price')
        .isNumeric().withMessage('El valor no es numérico')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom( value => value > 0 ).withMessage('El precio debe ser mayor a 0')
        .run( req )
    
    let errors = validationResult( req )
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() })
        return;
    }  
    // actualizar producto ( forma parcial )

        const { id } = req.params
        const product = await Product.findByPk( id )

         if(!product){
            res.status(404).json({
                error: 'Producto no encontrado'
            })
            return
        }
        
    
        await product.update( req.body )
        await product.save()
        res.json({ data : product })  

}

export const updateAvailability = async ( req : Request , res : Response )=>{

    let errors = validationResult( req )
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() })
        return;
    }  

        const { id } = req.params
        const product = await Product.findByPk( id )

        if(!product){
            res.status(404).json({
                error: 'Producto no encontrado'
            })
            return
        }

        product.availibility = !product.dataValues.availibility
        await product.save()

        res.json({ data : product})

}

export const deleteProduct = async ( req : Request , res : Response ) => {

    let errors = validationResult( req )
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() })
        return;
    }  
    
        const { id } = req.params
        const product = await Product.findByPk( id )
        
        if(!product){
            res.status(404).json({
                error: 'Producto no encontrado'
            })
            return
        }
        await product.destroy()
        res.json({ data: 'Producto eliminado' })

}

//const product = new Product( req.body )
    //const savedProduct = await product.save()


// actualizar producto ( forma estricta )
// product.name = req.body.name
// product.price = req.body.price
// product.availability = req.body.availability
// await product.save()