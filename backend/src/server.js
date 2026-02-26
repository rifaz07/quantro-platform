import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET missing in environment");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});