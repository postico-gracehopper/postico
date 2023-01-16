process.env.NODE_ENV = "test"
const {expect} = require("chai")
const request = require("supertest")
const app = require("../../server/app")
const {db, models: { User, Product }} = require("../../server/db")
const jwt = require('jsonwebtoken')
require('dotenv').config()



const userTokens = {
    guest: process.env.GUEST_TOKEN,
    user: process.env.USER_TOKEN,
    admin: process.env.ADMIN_TOKEN
}

const randAddress = () => `${Math.floor(Math.random()*1000)} Brick Lane`

describe("Users", () => {
    
    describe("GUEST accessing /users:", ()=> {
        
        it("GUEST GET /users", async () => {
            const res = await request(app)
                .get('/api/users')
                .set('authorization', userTokens.guest)
                .expect(500)
            
        }).timeout(5000)

        it("GUEST GET /users/:anyId", async () => {
            const res = await request(app)
                .get(`/api/users/${23}`)
                .set('authorization', userTokens.guest)
                .expect(500)
        })

        it("GUEST GET /users/:myId", async () => {
            const { id } = await jwt.verify(userTokens.guest, process.env.JWT_SECRET) 
            const res = await request(app)
                .get(`/api/users/${id}`)
                .set('authorization', userTokens.guest)
                .expect(200)
        })

        it("GUEST POST /users/", async () => {
            const res = await request(app)
                .post('/api/users/')
                .set('authorization', userTokens.guest)
                .expect(500)
        })

        it("GUEST PUT MULTIPLE /user/", async () => {
            const res = await request(app)
                .put('/api/users')
                .send([{username: "ringoStarr", password: "drummer"}, 
                {username: "elvis", password: "houndDog"}])
                .set('authorization', userTokens.guest)
                .expect(500)
        })


        it("GUEST PUT /user/:anyId", async () => {
            const res = await request(app)
                .put('/api/users/33')
                .send({username: "new_username"})
                .set('authorization', userTokens.guest)
                .expect(500)
        })

        it("GUEST PUT /user/:myId", async () => {
            const { id } = await jwt.verify(userTokens.guest, process.env.JWT_SECRET) 
            const res = await request(app)
                .put(`/api/users/${id}`)
                .send({addressLine1: `${Math.floor(Math.random()*1000)} Drifter Lane`})
                .set('authorization', userTokens.guest)
                .expect(500)
        })

        it("GUEST DELETE /user/:id", async () => {
            const res = await request(app)
                .delete('/api/users/10')
                .set('authorization', userTokens.guest)
                .expect(500)
        })
    })

    describe("USER (Registered) accessing /users", ()=> {
        
        it("USER GET /users", async () => {
            const res = await request(app)
                .get('/api/users')
                .set('authorization', userTokens.user)
                .expect(500)
            
        }).timeout(5000)

        it("USER GET /users/:anyId", async () => {
            const res = await request(app)
                .get(`/api/users/${23}`)
                .set('authorization', userTokens.user)
                .expect(500)
        })

        it("USER GET /users/:myId", async () => {
            const { id } = await jwt.verify(userTokens.user, process.env.JWT_SECRET) 
            const res = await request(app)
                .get(`/api/users/${id}`)
                .set('authorization', userTokens.user)
                .expect(200)
        })

        it("USER POST /users/", async () => {
            const res = await request(app)
                .post('/api/users/')
                .set('authorization', userTokens.user)
                .expect(500)
        })

        it("USER PUT MULTIPLE /user/", async () => {
            const res = await request(app)
                .put('/api/users')
                .send([{username: "ringoStarr", password: "drummer"}, 
                {username: "elvis", password: "houndDog"}])
                .set('authorization', userTokens.user)
                .expect(500)
        })


        it("USER PUT /user/:anyId", async () => {
            const res = await request(app)
                .put('/api/users/33')
                .send({username: "new_username"})
                .set('authorization', userTokens.user)
                .expect(500)
        })

        it("USER PUT /user/:myId", async () => {
            const { id } = await jwt.verify(userTokens.user, process.env.JWT_SECRET) 
            const res = await request(app)
                .put(`/api/users/${id}`)
                .send({addressLine1: `${Math.floor(Math.random()*1000)} Bobcat Lane`})
                .set('authorization', userTokens.user)
                .expect(201)
        })


        it("USER DELETE /user/:id", async () => {
            const res = await request(app)
                .delete('/api/users/10')
                .set('authorization', userTokens.user)
                .expect(500)
        })
    })

    describe("Admin accessing users:", ()=> {
        
        it("ADMIN GET /users", async () => {
            const res = await request(app)
                .get('/api/users')
                .set('authorization', userTokens.admin)
                .expect(200)
            
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.above(60);
        }).timeout(4000)

        it("ADMIN GET /user/:id", async () => {
            const res = await request(app)
                .get('/api/users/11')
                .set('authorization', userTokens.admin)
                .expect(200)
            
            expect(res.body).to.be.an('object')
            expect(Object.keys(res.body)).to.be.an('array')
            expect(Object.keys(res.body).length).to.be.above(5)
        })

        it("ADMIN POST /user/", async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({username: "newestUser", password: "superdupersecret"})
                .set('authorization', userTokens.admin)
                .expect(201)
        })

        it("ADMIN PUT /user/:id", async () => {
            const newUser = await User.findOne({where: {name: "newestUser"}})
            const res = await request(app)
                .put(`/api/users/${newUser.id}`, {email: "newestUser@gmail.com"})
                .set('authorization', userTokens.admin)
                .expect(201)
        })


        it("ADMIN PUT MULTIPLE /user/", async () => {
            const newUser = await User.findOne({where: {name: "newestUser"}})
            const res = await request(app)
                .put('/api/users', [
                    {id: newUser.id, addressLine1: randAddress()}, 
                    {id: 5, addressLine1: randAddress()}])
                .set('authorization', userTokens.admin)
                .expect(201)
        })


        it("ADMIN DELETE /user/:id", async () => {
            const newUser = await User.findOne({where: {name: "newestUser"}})
            const res = await request(app)
                .delete(`/api/users/${newUser.id}`)
                .set('authorization', userTokens.admin)
                .expect(200)
        })
    })
})