process.env.NODE_ENV = "test"
const {expect} = require("chai")
const request = require("supertest")
const app = require("../server/app")
const {db, models: { User, Product }} = require("../server/db")
require('dotenv').config()


const userTokens = {
    guest: process.env.GUEST_TOKEN,
    user: process.env.USER_TOKEN,
    admin: process.env.ADMIN_TOKEN
}


describe("routes", () => {

    describe("products", () => {
        
        describe("guest user accessing producst", ()=> {
            
            it("GUEST GET /products", async () => {
                const res = await request(app)
                    .get('/api/products')
                    .set('authorization', userTokens.guest)
                    .expect(200)
                
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.above(60);
            }).timeout(4000)

            it("GUEST GET /product/:id", async () => {
                const res = await request(app)
                    .get('/api/products/33')
                    .set('authorization', userTokens.guest)
                    .expect(200)
                
                expect(res.body).to.be.an('object')
                expect(Object.keys(res.body)).to.be.an('array')
                expect(Object.keys(res.body).length).to.be.above(5)
            })

            it("GUEST POST /product/", async () => {
                const res = await request(app)
                    .post('/api/products/', {name: "poles", price: "1312.43"})
                    .set('authorization', userTokens.guest)
                    .expect(500)
            })

            it("GUEST PUT /product/:id", async () => {
                const res = await request(app)
                    .put('/api/products/33', {price: "1312.43"})
                    .set('authorization', userTokens.guest)
                    .expect(500)
            })

            it("GUEST DELETE /product/:id", async () => {
                const res = await request(app)
                    .delete('/api/products/33', {price: "1312.43"})
                    .set('authorization', userTokens.guest)
                    .expect(500)
            })
        })

        describe("Registered user accessing producst", ()=> {
            
            it("USER GET /products", async () => {
                const res = await request(app)
                    .get('/api/products')
                    .set('authorization', userTokens.user)
                    .expect(200)
                
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.above(60);
            }).timeout(4000)

            it("USER GET /product/:id", async () => {
                const res = await request(app)
                    .get('/api/products/11')
                    .set('authorization', userTokens.user)
                    .expect(200)
                
                expect(res.body).to.be.an('object')
                expect(Object.keys(res.body)).to.be.an('array')
                expect(Object.keys(res.body).length).to.be.above(5)
            })

            it("USER POST /product/", async () => {
                const res = await request(app)
                    .post('/api/products/', {name: "poles", price: "1312.43"})
                    .set('authorization', userTokens.user)
                    .expect(500)
            })

            it("USER PUT /product/:id", async () => {
                const res = await request(app)
                    .put('/api/products/11', {price: "1312.43"})
                    .set('authorization', userTokens.user)
                    .expect(500)
            })

            it("USER DELETE /product/:id", async () => {
                const res = await request(app)
                    .delete('/api/products/11')
                    .set('authorization', userTokens.user)
                    .expect(500)
            })
        })

        describe("Admin accessing producst", ()=> {
            
            it("ADMIN GET /products", async () => {
                const res = await request(app)
                    .get('/api/products')
                    .set('authorization', userTokens.admin)
                    .expect(200)
                
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.above(60);
            }).timeout(4000)

            it("ADMIN GET /product/:id", async () => {
                const res = await request(app)
                    .get('/api/products/11')
                    .set('authorization', userTokens.admin)
                    .expect(200)
                
                expect(res.body).to.be.an('object')
                expect(Object.keys(res.body)).to.be.an('array')
                expect(Object.keys(res.body).length).to.be.above(5)
            })

            it("ADMIN POST /product/", async () => {
                const res = await request(app)
                    .post('/api/products/')
                    .send({name: "poles", price: "345.43"})
                    .set('authorization', userTokens.admin)
                    .expect(201)
            })

            it("ADMIN PUT /product/:id", async () => {
                const poles = await Product.findOne({where: {name: "poles"}})
                const res = await request(app)
                    .put(`/api/products/${poles.id}`, {price: "1312.43"})
                    .set('authorization', userTokens.admin)
                    .expect(201)
            })

            it("ADMIN DELETE /product/:id", async () => {
                const poles = await Product.findOne({where: {name: "poles"}})
                const res = await request(app)
                    .delete(`/api/products/${poles.id}`)
                    .set('authorization', userTokens.admin)
                    .expect(200)
            })
        })
    })
})