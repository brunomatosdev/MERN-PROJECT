//mongodb
require("./config/db");

const app = require("express")();
var port = process.env.PORT || 10000;

const UserRouter = require("./api/User");

// For accepting post form Data
const bodyParser = require("express").json;
app.use(bodyParser());

app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
