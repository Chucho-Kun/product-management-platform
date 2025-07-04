import { Request , Response } from "express"
import Product from '../models/Product.model';
import { check, validationResult } from "express-validator";
import { handleInputErrors } from "../middleware";

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
    
    try{
        const product = await Product.create( req.body )
        res.json( { data : product } )
    }catch( error ){
        console.log( error );
    }

}

//const product = new Product( req.body )
    //const savedProduct = await product.save()