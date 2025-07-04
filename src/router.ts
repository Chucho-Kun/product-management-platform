import { Router } from "express";
import { createProduct, getProductById, getProducts } from "./handlers/product";
import { param } from "express-validator";


const router = Router()

router.get('/', getProducts )

router.get('/:id', getProductById ,
    param('id').isInt().withMessage('ID no válido')
 )

router.post('/', createProduct )

router.put('/',(req,res) => {
    res.json('desde PUT')
})

router.patch('/' , ( req , res ) => {
    res.json('desde PATCH')
})

router.delete('/' , ( req , res ) => {
    res.json('desde DELETE')
})

export default router

/* VALIDACION DESDE EL ROUTER
import { body } from "express-validator";

router.post('/', 
    
    body('name')
        .notEmpty().withMessage('el nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('El valor no es numérico')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom( value => value > 0 ).withMessage('El precio debe ser mayor a 0'),
        
    createProduct 
)
        
        */