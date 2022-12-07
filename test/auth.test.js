process.env.MONGO_DB_NAME = 'ValorantTestDatabase';

let server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const jwt = require("jsonwebtoken");

chai.should();
chai.use(chaiHttp);

console.log(`Running tests using database '${process.env.MONGO_DB_NAME }'`);

describe("Register", () => {
    it("Should register a valid user", (done) => {
        chai
            .request(server)
            .post("/api/signup")
            .send({
                username: "Pouw",
                country: "Netherlands",
                password: "something"
            })
            .end((err, res) => {
                res.should.have.status(201)
                done()
            })
    })

    it("Should not be able to register a duplicate username", (done) => {
        chai
            .request(server)
            .post("/api/signup")
            .send({
                username: "Pouw",
                country: "Netherlands",
                password: "something"
            })
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })

})

