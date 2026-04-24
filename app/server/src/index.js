require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const { validateBody } = require('./middleware/validate');
const bfhlRoute = require('./routes/bfhl');

const app = express();


const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(",")
  : ["http://localhost:5173"];


app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));


app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "WORKS!" });
});

app.use('/bfhl', validateBody, bfhlRoute);

app.use((req, res) => {
  res.status(404).json({ error: "route not found!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "something went wrong, please check." });
});

const PORT = process.env.PORT || 8080;


if (require.main === module) {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = app;