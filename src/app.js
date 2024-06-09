const express = require("express");
const bodyParser = require("body-parser");
const contractsRouter = require("./routes/contracts");
const { resInternalServerError } = require("./utils");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use("/contracts", contractsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  resInternalServerError(res, err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
