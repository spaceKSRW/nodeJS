const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const fs = require("fs");
const {connectMongoDb} = require('./connection');
const userRouter = require('./routes/user')
const {logReqRes} = require('./middlewares/index.js')
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));

app.use('/user',userRouter);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
