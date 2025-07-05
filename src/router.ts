import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { param } from "express-validator";

const router = Router()

router.get('/', getProducts )

router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    getProductById
 )

router.post( '/' ,
    createProduct 
)

router.put( '/:id' ,
    param('id').isInt().withMessage('ID no válido'),
    updateProduct 
)

router.patch( '/:id' ,
    param('id').isInt().withMessage('ID no válido'),
    updateAvailability 
)

router.delete( '/:id' ,
    param('id').isInt().withMessage('ID no válido'),
    deleteProduct
)

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