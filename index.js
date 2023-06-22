const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "pages", "index.html");
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.set({ "Content-Type": "text/html" });
      res.status(200).send(content);
    }
  });
});

app.get("/:page", (req, res) => {
  const filePath = path.join(__dirname, "pages", `${req.url}.html`);
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.set({ "Content-Type": "text/html" });
        fs.readFile(
          path.join(__dirname, "pages", "404.html"),
          "utf8",
          (err, content) => {
            res.set({ "Content-Type": "text/html" });
            res.status(404).send(content);
          }
        );
      } else {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.set({ "Content-Type": "text/html" });
      res.status(200).send(content);
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on 8080 port");
});
