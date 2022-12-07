process.env.MONGO_DB_NAME = "ValorantTestDatabase";

let server = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");

let objectid = "";

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

describe("Team tests", () => {
  describe("Team create", () => {
    it("Should create a valid team", (done) => {
      agent
        .post("/api/teams")
        .send({
          teamname: "Sentinels",
          country: "Netherlands",
          ranking: 1,
          logo: "someimglink",
          author: "6390dcf5cfc959542a226168",
        })
        .end((err, res) => {
          objectid = res.body._id;
          res.should.have.status(201);
          done();
        });
    });

    it("Not create an invalid team", (done) => {
      agent
        .post("/api/teams")
        .send({
          teamname: "Sentinels",
          country: "Netherlands",
          ranking: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Get team", () => {
    it("Should get the new team", (done) => {
      agent.get("/api/teams/" + objectid).end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it("Should not find a team that does not exist", (done) => {
      agent.get("/api/teams/somethingrandom").end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe("Update team", () => {
    it("Should update the team", () => {
      agent
        .put("/api/teams/" + objectid)
        .send({
          teamname: "Sentinels",
          country: "United States",
          ranking: 1,
          logo: "someimglink",
          author: "6390dcf5cfc959542a226168",
        })
        .end((err, res) => {
          console.log(res)
          res.should.have.status(201);
          done();
        });
    });
  });

  describe("Delete team", () => {
    it("Should delete the team", () => {
      agent.delete("/api/teams/" + objectid).end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
