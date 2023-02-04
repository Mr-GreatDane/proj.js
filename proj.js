const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "112507",
  database: "db_webros",
});

// handles parsing JSON data from frontend
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
// cors
app.use(cors());

// CRUD Application
// CREATE (insert)
app.post("/register", (req, res) => {
  const { firstname, lastname, email, mobile, address, ifstud, message } = req.body;

  connection.query(
    "INSERT INTO tbl_webros VALUES (?, ?, ?, ?, ?, ?, ?);",
    [firstname, lastname, email, mobile, address, ifstud, message ],
    (err, results) => {
      try {
        if (results.affectedRows > 0) {
          res.json({ message: "Data has been added!" });
        } else {
          res.json({ message: "Something went wrong!" });
        }
      } catch (err) {
        res.json({ message: err });
      }
    }
  );
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
