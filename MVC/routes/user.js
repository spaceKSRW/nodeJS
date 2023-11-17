const express = require("express")
const router = express.Router()



  router.get("/", (req, res) => {
    res.setHeader("Greet", "helloo faggot");
    return res.json(users);
  });
  
  router.post("/", async (req, res) => {
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
  
  router
    .route("/:id")
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
  
  router.patch("/:id/:edit", async (req, res) => {
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

  module.exports = router;
