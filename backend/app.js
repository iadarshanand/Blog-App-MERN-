const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRoutes");

const cors = require("cors");
const app = express();
//cors
app.use(cors());
//tell application that we are receiving json fro req.body
app.use(express.json());

//DB CONNECTION
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.tmqcags.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected successfully"))
  .then(() =>
    app.listen(5000, () => {
      console.log("Listening at port 5000");
    })
  )
  .catch((e) => console.log(e));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//mongodb atlas user admin
//mongodb atlas password admin
