process.env.MONGO_DB_NAME = "ValorantTestDatabase";

let server = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");

let ownid = "6390dcf5cfc959542a226168";
let followid = "6390ffe10deb0449573a3cb3";

chai.should();
chai.expect();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe("Set up the test", () => {
  it("Login", (done) => {
    agent
      .post("/api/signin")
      .send({
        username: "Pouw",
        password: "something",
      })
      .end((err, res) => {
        done();
      });
  });
});

describe("follow tests", () => {
  describe("follow user", () => {
    it("Should follow a user", (done) => {
      agent
        .post("/api/users/" + ownid + "/follow")
        .send({
          followUser: followid
        })
        .end((err, res) => {
            console.log(res)
          res.should.have.status(201);
          done();
        })
    })

    it("Should unfollow a user", (done) => {
        agent
        .post("/api/users/" + ownid + "/unfollow")
        .send({
          unfollowUser: followid
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    })
    })
})
