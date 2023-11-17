const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const fs = require("fs");
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Mongo FATAL Error", err);
  });

const userSchema = new mongoose.Schema(
  {
    first_name: {
      required: true,
      type: String,
    },
    last_name: {
      required: true,
      type: String,
    },
    email: {
      reuqired: true,
      unique: true,
      type: String,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

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

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  console.log(allDbUsers);

  const html = `
         <ul>
    ${allDbUsers
      .map((users) => `<li>${users.first_name} - ${users.email}</li>`)
      .join("")}
         </ul>
      `;
  res.send(html);
});
app.get("/api/users", (req, res) => {
  res.setHeader("Greet", "helloo faggot");
  return res.json(users);
});

app.post("/api/users", async (req, res) => {
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
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log(result);
  return res.status(201).json({ msg: "successfully data has been sent !!" });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found!!" });
    return res.json(user);
  }).delete(async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser)
        {
            return res.status(404).json({msg:"User does not exist"})
        }
        console.log(deletedUser);
        return res.json(deletedUser);
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"internal server error"});
    }
  });

app.patch("/api/users/:id/:edit", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      last_name: req.params.edit,

    },{new:true}
    );
  
  if(!updatedUser)
  {
    return res.status(404).json({msg:"User does nut exist"})
  }
  return res.json({updatedUser});
}
  catch(err){
    console.error(err);
   return res.status(500).json({msg:"internal server error!!"})
  } 
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
