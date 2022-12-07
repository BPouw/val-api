process.env.MONGO_DB_NAME = "ValorantTestDatabase";

let server = require("../server");

const chai = require("chai");
const chaiHttp = require("chai-http");

let objectid = "";

chai.should();
chai.expect();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

console.log(`Running tests using database '${process.env.MONGO_DB_NAME}'`);

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

describe("map tests", () => {
  describe("map create", () => {
    it("Should create a valid map", (done) => {
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
          objectid = res.body._id;
          res.should.have.status(201);
          done();
        });
    });

    it("Not create an invalid map", (done) => {
      agent
        .post("/api/maps")
        .send({
            name: "Haven",
            is_active: true,
            description: "this is a test map",
            author: "6390dcf5cfc959542a226168",
          })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Get map", () => {
    it("Should get the new team", (done) => {
      agent.get("/api/maps/" + objectid).end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it("Should not find a map that does not exist", (done) => {
      agent.get("/api/maps/somethingrandom").end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe("Update map", () => {
    it("Should update the map", (done) => {
        agent
        .put("/api/maps/" + objectid)
        .send({
            name: "Haven",
            thumbnail: "someimg",
            is_active: true,
            description: "this is a test map",
            author: "6390dcf5cfc959542a226168",
          })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("Delete map", () => {
    it("Should delete the map", (done) => {
      agent.delete("/api/maps/" + objectid).end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });
  });
});
