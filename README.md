# REST API NODE - Typescrip - Server
an API with PostgreSQL - Node / Typescript Server - Express ( PERN )
## Technologies
React + Typescript + TailwindCSS + Zustand + Axios + Zod + React Router and different libraries that are listed in the development commits
## Developer Notes
### PERN Stack
#### src/router.ts
```
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
```
