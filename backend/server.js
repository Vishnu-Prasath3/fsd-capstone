const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const router = express.Router();

dotenv.config();
connectDB();

const app = express();
app.use(
  cors(
    app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "https://fsd-capstone-frontend.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Allow cookies & auth headers
      })
    )
  )
);
app.use(express.json());
app.use(router);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
