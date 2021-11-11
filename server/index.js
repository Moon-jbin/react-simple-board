const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!whdqls9512",
  database: "simpleboard",
});
// db.connect();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/get", (req, res) => {
  const sqlQuery = "SELECT * FROM simpleboard;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const sqlQuery = "INSERT INTO simpleboard (title, content) VALUES (?,?)";
  db.query(sqlQuery, [title, content], (err) => {
    if (err) {
      console.log("데이터 가져오기 실패", content);
    } else {
      res.send("success!!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
