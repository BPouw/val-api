process.env.MONGO_DB_NAME = "ValorantTestDatabase";

let server = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");

let teamid1 = "";
let teamid2 = "";
let objectid = "";
let mapid = "";

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
  it("Creates team for match", (done) => {
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
        teamid1 = res.body._id;
        res.should.have.status(201);
        done();
      });
  });
  it("Creates team for match", (done) => {
    agent
      .post("/api/teams")
      .send({
        teamname: "100 Thieves",
        country: "Netherlands",
        ranking: 2,
        logo: "someimglink",
        author: "6390dcf5cfc959542a226168",
      })
      .end((err, res) => {
        teamid2 = res.body._id;
        res.should.have.status(201);
        done();
      });
  });
  it("Creates a map for the match", (done) => {
    agent
      .post("/api/maps")
      .send({
        name: "Haven",
        thumbnail: "someimg",
        is_active: true,
        description: "this is a test map",
        author: "6390dcf5cfc959542a226168",
      })
      .end((err, res) => {
        mapid = res.body._id;
        res.should.have.status(201);
        done();
      });
  });
});

describe("match tests", () => {
  describe("match create", () => {
    it("Should create a valid match", (done) => {
      agent
        .post("/api/matches")
        .send({
          name: "Val test match",
          winner: teamid1,
          date: new Date(2022, 10, 12),
          map: mapid,
          team1: teamid1,
          team2: teamid2,
          resultteam1: 13,
          resultteam2: 9,
          author: "6390dcf5cfc959542a226168"
        })
        .end((err, res) => {
          objectid = res.body._id;
          res.should.have.status(201);
          done();
        });
    });

    it("Not create an invalid match", (done) => {
      agent
        .post("/api/matches")
        .send({
            winner: teamid1,
            date: new Date(2022, 10, 12),
            map: mapid,
            team1: teamid1,
            team2: teamid2,
            resultteam1: 13,
            resultteam2: 9,
            author: "6390dcf5cfc959542a226168"
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Get match", () => {
    it("Should get the new team", (done) => {
      agent.get("/api/matches/" + objectid).end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it("Should not find a match that does not exist", (done) => {
      agent.get("/api/matches/somethingrandom").end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe("Update match", () => {
    it("Should update the match", (done) => {
        agent
        .put("/api/matches/" + objectid)
        .send({
            name: "Val test match 2",
            winner: teamid1,
            date: new Date(2022, 10, 12),
            map: mapid,
            team1: teamid1,
            team2: teamid2,
            resultteam1: 13,
            resultteam2: 9,
            author: "6390dcf5cfc959542a226168"
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("Delete match", () => {
    it("Should delete the match", (done) => {
      agent.delete("/api/matches/" + objectid).end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });
  });
});
