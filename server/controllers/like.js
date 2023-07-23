
import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const getLike = (req,res) => {

    const q = `SELECT userId FROM likes WHERE postId = ?`
    
    db.query(q,[req.query.postId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.userId))
    });
};

export const addLike = (req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err, userInfo)=> {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)"
    const VALUSE = [
        userInfo.id,
        req.body.postId,
    ];

        db.query(q,[VALUSE], (err,data)=> {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Like has been created")
        });
    });
};

export const deleteLike = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err, userInfo)=> {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

        db.query(q,[userInfo.id, req.query.postId], (err,data)=> {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Delect Like")
        });
    });  
};
