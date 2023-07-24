import {db} from '../connect.js';
import jwt from 'jsonwebtoken';


export const getRelationship = (req, res) => {
    const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`
    
    db.query(q,[req.query.followedUserId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followerUserId))
    });
}

export const addRelationship = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err, userInfo)=> {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)"
    const VALUSE = [
        req.body.userId,
        req.body.userFollow,
    ];

        db.query(q,[VALUSE], (err,data)=> {
            if (err) return res.status(500).json(err);
            return res.status(200).json("follow has been created")
        });
    });
} 

export const deleteRelationship = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err, userInfo)=> {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

        db.query(q,[userInfo.id, req.query.userFollow], (err,data)=> {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Delect Like")
        });
    });  
}