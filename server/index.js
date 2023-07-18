import express from 'express';
import cors from 'cors';


// Routes setup
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from 'cookie-parser';

// Useing app
const app = express()
const port = 3000
// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Routes Useing
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/like", likeRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})