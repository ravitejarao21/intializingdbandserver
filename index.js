const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

let dbpath = path.join(__dirname, "goodreads.db");

const app = express();

let db = null;

const intializedbandserver = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server run");
    });
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

intializedbandserver();

app.get("/books/", async (request, response) => {
  const getbooks = "SELECT * FROM book ORDER BY book_id";

  const booksarray = await db.all(getbooks);
  response.send(booksarray);
});
