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

describe("Authorization", () => {


    describe("/auth/me", async () =>{

        it("Visitor GET /auth/me >> token generated", async () => {
            const res = await request(app)
            .get(`/auth/me`)
            .expect(200)

            expect(res.body).to.be.an('object')
            expect(res.body.token).to.be.a("string")
            expect(res.body.token.length).to.be.above(110)
        }).timeout(5000)


        it("Guest GET /auth/me", async () => {
            const res = await request(app)
                .get(`/auth/me`)
                .set("authorization", userTokens.guest)
                .expect(200)

            expect(res.body).to.be.an('object')
            expect(res.body.isGuest).to.be.a('boolean')
            //expect(res.body.isGuest).to.be(true) // !@#
        })

        it("User GET /auth/me", async () => {
            const res = await request(app)
                .get("/auth/me")
                .set("authorization", userTokens.user)
                .expect(200)
            
            expect(res.body).to.be.an("object")
            expect(res.body.id).to.be.a("number")
        })

        it("Admin GET /auth/me", async () => {
            const res = await request(app)
                .get("/auth/me")
                .set("authorization", userTokens.admin)
                .expect(200)
            
            expect(res.body).to.be.an("object")
            expect(res.body.id).to.be.a("number")
        })

        
    })  

    describe("/auth/signup", () => {
        
        it("guest signs up", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({username: "morpheus", password: "wakeup"})
                .expect(200)
            
            expect(res.body).to.be.an('object')
            expect(res.body.token).to.be.a("string")
            expect(res.body.token.length).to.be.above(110)

            // delete the entry we've just created
            const { id } = await jwt.verify(res.body.token, process.env.JWT_SECRET) 
            await request(app).delete(`/api/users/${id}`)
                .set("authorization", userTokens.admin)
                .expect(200)
        })

        it("guest signs up, name taken", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({username: "demo_user", password: "second_password"})
                .expect(401)
            
            // !@# expect this to equal "User already exists"
            console.log(res.error.text)
        })

        it("guest with cart signs up", async () => {
            const res0 = await request(app).get("/auth/me")
        
            // !@# add item to cart
            const res = await request(app)
                .post("/auth/signup")
                .send({username: "user_with_cart", password: "secret123"})
                .set("authorization", res0.body.token)
                .expect(200)
            
            // !@# query the cart to ensure it moved over 
            const { id } = await jwt.verify(res.body.token, process.env.JWT_SECRET) 
            await request(app).delete(`/api/users/${id}`)
                .set("authorization", userTokens.admin)
                .expect(200)
        })
    })

    describe("/auth/login", async () => {
        it("User valid login", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({username: "demo_user", password: process.env.DEFAULT_PASSWORD})
                .expect(200)
        })

        it("User  invalid login", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({username: "demo_user", password: "iForget"})
                .expect(401)

            // !@# expect equal to...
            console.log(res.error.text)
        })
    })
})