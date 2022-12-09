process.env.MONGO_DB_NAME = "ValorantTestDatabase";

let server = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const jwt = require("jsonwebtoken");
const User = require("../src/models/user_model");

chai.should();
chai.expect();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

console.log(`Running tests using database '${process.env.MONGO_DB_NAME}'`);

describe("Register", () => {
  it("Should not be able to register a duplicate username", (done) => {
    chai
      .request(server)
      .post("/api/signup")
      .send({
        username: "Pouw",
        country: "Netherlands",
        password: "something",
      })
      .end((err, res) => {
        res.should.have.status(400);

        let error = res.body.message;

        error.should.equal("Username has already been taken")
        done();
      });
  });
});

describe("Sign in", () => {
  it("Should not be able to login when not registered", (done) => {
    agent
      .post("/api/signin")
      .send({
        username: "wrong",
        password: "nothing",
      })
      .end((err, res) => {
        res.should.have.status(404);

        let error = res.body.message;

        error.should.equal("User not found")

        done();
      });
  });

  it("Should be able to login when registered", (done) => {
    agent
      .post("/api/signin")
      .send({
        username: "Pouw",
        password: "something",
      })
      .end((err, res) => {
        res.should.have.cookie("val-session");
        res.should.have.cookie("val-session.sig");
        res.should.have.status(200);

        let message = res.body.username;

        message.should.equal("Pouw")
        done();
      });
  });
});

// describe('Drop user records', () => {
//     it('Delete all users', (done) => {
//         User.deleteMany({}, () => {
//             agent.close();
//             done();
//         })
//     })
// })
