const express= require("express")
const app = express()
const fs = require("fs")
const PORT = 8000
const users = require("./MOCK_DATA.json")

//middleware
app.use(express.urlencoded({extended:false}));

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

app.post('/api/users',(req,res)=>{
    const body = req.body;
    console.log(body);
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"pending!!"})  
    })
})


// we use route since many route used in serving different purposes

// app.get('/api/users/:id',(req,res)=>{
//     const id = parseInt(req.params.id);
//     const user = users.find((user)=>{
//         return user.id===id;
//     })
//     return res.json(user)
// })


// app.patch('/api/users/:id',(req,res)=>{
//      return res.json({status:"pending!!"})
// })

// app.delete("/api/users/:id",(req,res)=>{

// })

app.route('/api/users/:id').get((req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.find((user)=>{
        return user.id===id;
    })
    return res.json(user)
}).patch((req,res)=>{
    return res.json({status:"pending!!"})
}).delete((req,res)=>{

})



app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
}) 

