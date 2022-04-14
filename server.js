// const express = require ('express');
// const mysql = require ('mysql');

// const app = express();  


// app.use(express.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false}))

// // create a connection to our sql DB

// const db = mysql.createPool({
//     host:process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB

// })

// const listener = app.listen(process.env.PORT || 3000, ()=>{
//     console.log("app is listening on port " + listener.address().port)
// })


// // now we have to put CRUD

// app.get ('/reviews', (req,res)=>{
//     db.query("SELECT * FROM book_reviews", (err,result)=>{
//         if (err){
//             console.log(err);
//         } else {
//             res.send(result)
//         }
//     })
// })

const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create a connection to our db
const db = mysql.createPool({
  host: process.env.DB_HOST,
    user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port' + listener.address().port )
})


//now we have to put in crud

app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM book_review", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
  }
})
})

app.post("/reviews", (req, res) => {
  const insertQuery = "INSERT INTO booksDB SET ?";
  db.query(insertQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
}
  })
})

app.put("/reviews", (req, res) => {
  const updateQuery = "UPDATE booksDB SET book_review = ?, book_rating = ? WHERE id = ? ";
  db.query(
    updateQuery,
    [req.body.book_review, req.body.book_rating, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    } 
  )
})

app.delete("/reviews/:id", (req, res) => {
  db.query(
    "DELETE FROM book_review WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  )
})