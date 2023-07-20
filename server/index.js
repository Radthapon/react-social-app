import express from 'express';
import cors from 'cors';


// Routes setup
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from 'cookie-parser';
const app = express()

// middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Useing app

const port = 3000



// Routes Useing
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/like", likeRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})