import request from 'supertest'
import server , { connectDB } from '../../server'
import db from '../../config/db'


describe('POST /api/products' , () => {

    test('should display validation errors' , async () => {
        const response = await request( server ).post( '/api/products' ).send({}) 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect( response.body.errors ).toHaveLength(4)
    })

    test( 'should validate the price is greater than 0' , async () => {
        const response = await request( server ).post('/api/products').send({
            name: "Monitor curvo - Testing",
            price: 0
        })

        expect( response.status ).toBe(400)
        expect( response.body ).toHaveProperty('errors')
        expect( response.body.errors ).toHaveLength(1)

        expect( response.status ).not.toBe( 404 )

    })

    test('should validate price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "monitor de pruebas",
            price: "hola"
        })

        expect(response.status ).toBe(400)
        expect( response.body ).toHaveProperty('errors')
        expect( response.body.errors ).toHaveLength(2)

        expect( response.status ).not.toBe(404)
        expect( response.body.errors ).not.toHaveLength(4)
    })

    test( 'should create a new product' , async () => {
        const response = await request( server ).post( '/api/products' ).send({
            name: "Mouse-Testing",
            price: 50
        })

        expect( response.status ).toBe(201)
        expect( response.body ).toHaveProperty('data')

        expect( response.status ).not.toBe( 400 )
        expect( response.status ).not.toBe( 404 )
        expect( response.status ).not.toBe( 200 )
        expect( response.body ).not.toHaveProperty('errors')

    } )
})

describe( 'GET /api/products' , () => {

    test( 'should check if api/products url exist' , async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    test( 'GET a json response with products' , async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
} ) 

describe( 'GET /api/products/:1d' , () => {
    test('Shoul return a 404 response for a non-existent product' , async () => {
        const productID = 2000
        const response = await request(server).get(`/api/products/${productID}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
    })

    test( 'should check a valid ID in the URL' , async () => {
        const response = await request(server).get('/api/products/not-valid-id')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')    
        
        expect(response.status).not.toBe(200)
    })

} )

describe('PUT /api/products/:id', () => {

    test('should display validation error messages when updating a product' , async () => {
        const response = await request(server).put('/api/products/1').set({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(3)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should validate that the price is greater than 0' , async () => {
        const response = await request(server).put('/api/products/1').send({
            name:"monitor - test",
            availibility:true,
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a 0')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})

describe( 'PATCH /api/products/:id' , () => {
    test( 'should return a 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request( server ).patch(`/api/products/${ productId }`)
        expect( response.status ).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    } )

    test('should update the product availibility' , async () => {
        const response = await request(server).patch(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availibility).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe( 'DELETE /api/products/:id' , () => {
    test( 'should return a 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request( server ).delete(`/api/products/${ productId }`)
        expect( response.status ).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    } )

    test('should update the product availibility' , async () => {
        const response = await request(server).delete(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})
/*
jest.mock('../../config/db')

describe('connectDB', () => {

    test('should handle database connection error', async () => {
        jest.spyOn( db , 'authenticate' )
            .mockRejectedValueOnce( new Error('Error en la conexión a la base de datos') )

        const consoleSpy = jest.spyOn( console , 'log' )

        await connectDB()
        expect( consoleSpy ).toHaveBeenCalledWith(
            expect.stringContaining('Error en la conexión a la base de datos')
        )
    })

}) */



