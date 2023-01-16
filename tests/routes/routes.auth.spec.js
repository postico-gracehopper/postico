process.env.NODE_ENV = "test"
const {expect} = require("chai")
const request = require("supertest")
const app = require("../../server/app")
const {db, models: { User, Product }} = require("../../server/db")
const jwt = require('jsonwebtoken')
require('dotenv').config()


describe("Authorization", () =>{

    describe("Visitor w/o token arrives, is Issued token", () =>{
        const res = await request(app)
            .get(`/auth/me`)
            .expect(200)
        
        console.log(res.data)
    })







})