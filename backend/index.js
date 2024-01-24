const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");



app.use("/api/v1", mainRouter);
app.listen(3000, () => {
    console.log("Server started at port 3000\n go to http://localhost:3000/api/v1");
}
);
