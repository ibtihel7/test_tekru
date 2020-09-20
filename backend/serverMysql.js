const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const assert = require("assert");
const app = express();
const SECRETKEY = "ibtihel";
app.use(bodyParser.json());

//MySQL details

var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  // pass: "ibtihel",
  database: "tekru",
});
db.connect(function (err) {
  if (err) throw err;
  return;
  console.log("You are Connected!");
});

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

/* Get users*/

app.get("/get-users", (req, res) => {
  db.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

/* Add User */
app.post("/add-user", function (req, res) {
  var userName = req.body.name;
  var userFamily_name = req.body.family_name;
  var userPassword = req.body.password;
  var userLast_login_date = req.body.last_login_date;
  var userCreated_at = req.body.created_at;
  var userUpdated_at = req.body.updated_at;
  var userPhone = req.body.phone;
  var userEmail = req.body.email;

  var newuser = {
    // _id:userID,
    name: userName,
    family_name: userFamily_name,
    password: userPassword,
    last_login_date: userLast_login_date,
    created_at: userCreated_at,
    updated_at: userUpdated_at,
    phone: userPhone,
    email: userEmail,
  };
  db.query("INSERT INTO users SET ?", newuser, function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.send("There was a problem to add the user to the database.");
    } else {
      res.redirect("get-users");
    }
  });
});

//   remove user

app.delete("/delete-user/:id", (req, res) => {
  console.log("Request", req.params.id);
  let sql = "DELETE FROM users WHERE _id = {req.params.id}";
  console.log(sql);
  db.query(sql, (error, results, fields) => {
    if (error) return console.error("ERROR", error.message);
    res.status(200).send(results);
    console.log("Deleted Row(s):", results.affectedRows);
  });
});

//edit user

app.put("/edit-user/:id", (req, res) => {
  let updated = req.body;
  var sql =
    "UPDATE users SET @name = ?;SET @family_name = ?;SET @password = ?;SET @last_login_date = ?;SET @created_at = ?;SET @updated_at = ?;SET @phone = ?;SET @email = ? WHERE _id = {req.params.id}";
  db.query(
    sql,
    [
      // updated._id,
      updated.name,
      updated.family_name,
      updated.password,
      updated.last_login_date,
      updated.created_at,
      updated.updated_at,
      updated.phone,
      updated.email,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Learner Details Updated Successfully");
      else console.log(err);
    }
  );
});

app.listen(3055, (err) => {
  assert.equal(null, err, "server not running");
  console.log("the server is running on port 3055");
});
