import express  from "express";
import { getComment, addComment } from "../controllers/comment.js";

const router = express.Router()

router.get("/",getComment)
router.post("/",addComment)

export default router;