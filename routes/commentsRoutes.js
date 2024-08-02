const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const commentsRouter = express.Router();

// routes

commentsRouter.get("/", (req, res) => {
  let selectAllCommentsQuery = `SELECT comments.id, comments.isAccept, comments.helpfulltrue, comments.helpfullfalse, comments.score , comments.body, comments.date, comments.hour, users.firsname as userID, products.title as productID FROM comments INNER JOIN users ON users.id = comments.userID INNER JOIN products ON products.id = comments.productID ORDER BY comments.id DESC`;
  
  SabzLearnShopDB.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send('error khorde');
    } else {
      res.send(result);
    }
  });
});

commentsRouter.delete("/:commentID", (req, res) => {
  let commentID = req.params.commentID;

  let deleteCommentQuery = `DELETE FROM comments WHERE id = ${commentID}`;
  SabzLearnShopDB.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.put("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let editCommentQuery = `UPDATE comments SET body="${req.body.body}" WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/", (req, res) => {
  let body = req.body;
  // let id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  // let postCommentQuery = `INSERT INTO Comments VALUES ("${body.body}", "${body.date}", "${body.hour}", ${body.userID}, ${body.productID}, ${body.isReply}, ${body.replyID}, ${body.isAccept}, ${body.score}, ${body.helpfulltrue}, ${body.helpfullfalse})`;
  let postCommentQuery = `INSERT INTO comments (body, date, hour, userID, productID, isReply, replyID, isAccept, score, helpfulltrue, helpfullfalse) VALUES ("${body.body}","${body.date}","${body.hour}",${body.userID},${body.productID},${body.isReply},${body.replyID},${body.isAccept},${body.score},${body.helpfulltrue},${body.helpfullfalse})`
  
  SabzLearnShopDB.query(postCommentQuery, (err, result) =>{
    if(err){
      res.send(null);
    } else{
      res.send(result);
    }
  });
})

commentsRouter.post("/accept/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE comments SET isAccept = 1 WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/reject/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  // console.log(commentID);
  let editCommentQuery = `UPDATE comments SET isAccept = 0 WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/helpfalse/:commentID", (req, res) => {
  let body = req.body;
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE comments SET helpfullfalse = ${body.helpfullfalse} WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/helptrue/:commentID", (req, res) => {
  let body = req.body;
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE comments SET helpfulltrue = ${body.helpfulltrue} WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});
module.exports = commentsRouter;
