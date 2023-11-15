const express= require("express")
const app = express()
const PORT = 8000
const users = require("./MOCK_DATA.json")


// server side rendering
app.get("/users",(req,res)=>{
    const html =`
       <ul>
  ${users.map(user=> `<li>${user.first_name}</li>`).join("")}
       </ul>
    `;
    res.send(html);
})
//Routes

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.find((user)=>{
        return user.id===id;
    })
    return res.json(user)
})


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
}) 