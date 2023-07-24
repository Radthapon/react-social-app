import express from 'express';
import cors from 'cors';


// Routes setup
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import relationshipRoutes from "./routes/relationships.js"
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express()
const port = 3000
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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"),(req,res) => {
  const file = req.file;
  res.status(200).json(file.filename)
})


// Routes Useing
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/relationships",relationshipRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})