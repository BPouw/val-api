const neo4j = require("neo4j-driver");
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

function connect(dbName) {
  this.dbName = dbName;
  this.driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
  );
}

function session() {
  return this.driver.session({
    database: this.dbName,
    defaultAccessMode: neo4j.session.WRITE,
  });
}

module.exports = {
  connect,
  session,
  dropAll: "MATCH (n) DETACH DELETE n",
  follow:
    "MERGE (user:User {id: $userName, userId: $userId}) MERGE (userToFollow:User {id: $userToFollowName, userId: $userToFollowId}) MERGE (user)-[:FOLLOWS]->(userToFollow)",
  userToFollow:
    "MATCH (user:User {id: $userId})-[:FOLLOWS]->(follows:User) RETURN collect(follows.id) as followNames",
  unfollow:
    "MATCH (:User{userId: $userId})-[r:FOLLOWS]->(:User{userId: $userToUnfollowId}) DETACH DELETE r",
};
