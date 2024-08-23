const express = require("express");
const app = express();
const port = 3000;

require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/article");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("All Done");
});
