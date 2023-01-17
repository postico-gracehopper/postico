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


describe("Orders Route", () => {
    describe("GUEST accessing /orders", () => {
        it("GUEST GET /orders", async () => {
            const res = await request(app)
                .get('/api/users')
                .set('authorization', userTokens.guest)
                .expect(401)
        }).timeout(5000)
    

        it("GUEST GET /orders/:anyId", async () => {
            const res = await request(app)
                .get(`/api/orders/1`)
                .set('authorization', userTokens.guest)
                .expect(401)
        }).timeout(5000)
    })
})