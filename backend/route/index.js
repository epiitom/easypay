const express = require("express");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const router = express.Router();

router.use("/user",userRouter);

module.exports = router;
