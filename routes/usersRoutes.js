const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const usersRouter = express.Router();

// routes

usersRouter.get("/", (req, res) => {
  let selectAllUsersQuery = `SELECT * FROM users`;

  SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});
usersRouter.get("/id=:id", (req, res) => {
  let id = req.params.id;
  let selectAllUsersQuery = `SELECT * FROM users WHERE id = ${id}`;

  SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.get("/user=:username", (req, res) => {
  let username = req.params.username;
  let selectAllUsersQuery = `SELECT * FROM users WHERE username = '${username}'`;

  SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      if(result.length !==  0){
        res.send(false);
      } else{
        res.send(true);
      }
      console.log(result);
    }
  });
});

// usersRouter.post("/username", (req, res) => {
//   let body = req.body;
//   let selectAllUsersQuery = `SELECT * FROM users WHERE username = '${body.username}'`;
  
//   SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
//     if (err) {
//       res.send(null);
//       console.log('err');
//     } else {
//       // if(result.length !==  0){
//       //   res.send(false);
//       //   // console.log('false', result);
//       // } else{
//       //   // console.log('true', result);
//       //   res.send(true);
//       // }
//       console.log(result);
//     } 
//   });
// });

usersRouter.get("/:email", (req, res) => {
  let email = req.params.email;
  console.log(email);
  let selectAllUsersQuery = `SELECT * FROM users WHERE email = '${email}'`;

  SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      if(result.length !==  0){
        res.send(true);
      }else{
        res.send(false);
      }
    }
  });
});

usersRouter.get("/:email/:password", (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  let selectAllUsersQuery = `SELECT * FROM users WHERE email = '${email}' && password = '${password}'`;

  SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      if(result.length !== 0){
        res.send([true, result[0].id]);
     }else{
        res.send(false);
     }
    }
  });
});

usersRouter.delete("/:userID", (req, res) => {
  let userID = req.params.userID;

  let deleteUserQuery = `DELETE FROM users WHERE id = ${userID}`;

  SabzLearnShopDB.query(deleteUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.put("/:userID", (req, res) => {
  let userID = req.params.userID;
  let body = req.body;

  let editUserQuery = `UPDATE users SET firsname="${body.firsname}", lastname="${body.lastname}", username="${body.username}", password="${body.password}", email="${body.email}" ,score=${body.score}, buy=${body.buy} WHERE id = ${userID}`;

  SabzLearnShopDB.query(editUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  // let id = Math.floor(Math.random()*(999-100+1)+100); 
  // let addUserQuery = `INSERT INTO Users VALUES("${body.firstname}", "${body.lastname}", "${body.username}", "${body.password}", "${body.email}", ${body.score}, ${body.buy})`;
 let addUserQuery = `INSERT INTO users (firsname, lastname, username, password, email, score, buy) VALUES ("${body.firstname}","${body.lastname}","${body.username}","${body.password}","${body.email}",${body.score},${body.buy})`
  SabzLearnShopDB.query(addUserQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});


module.exports = usersRouter;
