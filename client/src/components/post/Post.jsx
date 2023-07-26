import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequset } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false)
  const {currentUser} = useContext(AuthContext);
  
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
      makeRequset.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );
   
  const mutation = useMutation((liked)=> {
        if (liked) return makeRequset.delete("/likes?postId="+post.id)
        return makeRequset.post("/likes", {postId:post.id})
      },{
        onSuccess:()=>{
          queryClient.invalidateQueries(["likes"])
        },
      }
    );

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try{
      mutation.mutate(data.includes(currentUser.id));
    } catch(err){
      console.log(err);
    };
  };


  const deleteMutation = useMutation((postId)=> {
    return makeRequset.delete("/posts/"+ postId)
  },{
    onSuccess:()=>{
      queryClient.invalidateQueries(["posts"])
    },
  }
);
  const handledeletePost = async (e) => {
    e.preventDefault();
    try{
      deleteMutation.mutate(post.id);
    } catch(err){
      console.log(err);
    };
  }


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handledeletePost}>delete post</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`/upload/${post.img}`} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "logding..."
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{color:"red"}}
              onClick={handleLikeClick}
              />
            ) : (
              <FavoriteBorderOutlinedIcon 
              onClick={handleLikeClick} 
              />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id}/>}
      </div>
    </div>
  );
};

export default Post;
