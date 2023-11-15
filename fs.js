const fs = require("fs")
const os = require("os")
// fs.writeFileSync('./test.txt',"hey there");
// fs.writeFile("./test.txt","hello world",(err)=>{
//     console.error(err);
// })

//now reading , synchronusly
// const res = fs.readFileSync('./test.txt',"utf-8")
// console.log(res);

//asynchrounsly
fs.readFile("./test.txt","utf-8",(err,res)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log(res);
    }
})

// now appending file (it will not override!! )
// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

// to craete a copy
// fs.cpSync("./test.txt","./copy.txt");

//delete a file
// fs.unlinkSync("./copy.txt");

//check the status of the file
// console.log(fs.statSync("./test.txt"));

//creating a directory 
// fs.mkdirSync("my-docs");


