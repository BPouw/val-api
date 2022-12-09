process.env.MONGO_DB_NAME = "ValorantTestDatabase";

let server = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");

let teamid = "";
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
  it("Creates team for player", (done) => {
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
        teamid = res.body._id;
        res.should.have.status(201);
        done();
      });
  });
});

describe("Player tests", () => {
  describe("Player create", () => {
    it("Should create a valid player", (done) => {
      agent
        .post("/api/players")
        .send({
          gamertag: "Pouw",
          country: "Netherlands",
          fullname: "Boris Pouw",
          earnings: 1,
          picture: "someimglink",
          team: teamid,
          author: "6390dcf5cfc959542a226168",
        })
        .end((err, res) => {
          objectid = res.body._id;
          res.should.have.status(201);
          message = res.body.gamertag
          message.should.contain("Pouw")
          done();
        });
    });

    it("Not create an invalid player", (done) => {
      agent
        .post("/api/players")
        .send({
          gamertag: "Pouw",
          country: "Netherlands",
          earnings: 1,
          picture: "someimglink",
          team: teamid,
          author: "6390dcf5cfc959542a226168",
        })
        .end((err, res) => {
          res.should.have.status(400);
          message = res.body.message
          message.should.equal('players validation failed: fullname: a player must have a real name')
          done();
        });
    });
  });

  describe("Get player", () => {
    it("Should get the new team", (done) => {
      agent.get("/api/players/" + objectid).end((err, res) => {
        res.should.have.status(200);
        message = res.body.gamertag
        message.should.equal("Pouw")
        done();
      });
    });

    it("Should not find a player that does not exist", (done) => {
      agent.get("/api/players/somethingrandom").end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe("Update player", () => {
    it("Should update the player", (done) => {
        agent
        .put("/api/players/" + objectid)
        .send({
          gamertag: "Pouw",
          country: "Netherlands",
          fullname: "Boris Pouw",
          earnings: 1,
          picture: "someimglink",
          team: teamid,
          author: "6390dcf5cfc959542a226168",
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("Delete player", () => {
    it("Should delete the player", (done) => {
      agent.delete("/api/players/" + objectid).end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });
  });
});
