const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { ObjectID, MongoClient } = require("mongodb");
const assert = require("assert");

const app = express();
const SECRETKEY = "ibtihel";
app.use(bodyParser.json());

const MongoUrl = "mongodb://localhost:27017";

const database = "tekru";

// login

const verifyTheToken = (req, res, next) => {
  // getting the token from the header
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, SECRETKEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post("/login", (req, res) => {
  console.log("got the request");
  // check for the username and password
  console.log(req.body);
  const { username, password } = req.body;

  // database authenticate username and password
  if (username === "tekru" && password === "tekru") {
    const user = {
      username,
    };
    jwt.sign({ user }, SECRETKEY, (err, token) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          token,
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
});

MongoClient.connect(MongoUrl, { useNewUrlParser: true }, (err, client) => {
  assert.equal(null, err, "can not connect to database");
  const db = client.db(database);

  //add user
  app.post("/add-user", (req, res) => {
    let newuser = req.body;
    db.collection("users").insertOne(newuser, (err, data) => {
      if (err) res.send("cant not add user");
      else res.send(data);
    });
  });
  //get user
  app.get("/get-users", (req, res) => {
    db.collection("users")
      .find()
      .toArray((err, data) => {
        if (err) res.send("can not get user");
        else res.send(data);
      });
  });
  //remove user
  app.delete("/delete-user/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    db.collection("users").findOneAndDelete({ _id: id }, (err, data) => {
      if (err) res.send("can not delete user");
      else res.send(data);
    });
  });
  //edit user
  app.put("/edit-user/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    let updated = req.body;
    db.collection("users").findOneAndUpdate(
      { _id: id },
      { $set: { ...updated } },
      (err, data) => {
        if (err) res.send("can not edit the users");
        else res.send(data);
      }
    );
  });
});

app.listen(3055, (err) => {
  assert.equal(null, err, "server not running");
  console.log("the server is running on port 3055");
});
