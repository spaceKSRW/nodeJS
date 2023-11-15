const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8000;
const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  fs.appendFile(
    "entry.txt",
    `${Date.now()} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
  console.log("Hello from the middleware 1");
  // return res.json({msg:"hello from middleware 1"});
});

app.get("/users", (req, res) => {
  const html = `
       <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
       </ul>
    `;
  res.send(html);
});
app.get("/api/users", (req, res) => {
  res.setHeader("Greet", "helloo faggot");
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "all fields are required !!" });
  }
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending!!" });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => {
      return user.id === id;
    });
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending!!" });
  })
  .delete((req, res) => {});
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
