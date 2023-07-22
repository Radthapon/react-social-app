import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequset } from "../../axios";
import moment from 'moment'

const Comments = ({postId}) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("")
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['comments'],()=>
    makeRequset.get("/comments?postId="+ postId).then((res) => {
      return res.data
    })
  );

  const mutation = useMutation((newComment) => {
    return makeRequset.post("/comments", newComment);
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(['comments'])
    }
  })

  const handleSendComment = async (e) => {
    e.preventDefault()
    try{
      mutation.mutate({comment, postId})
      setComment("")
    } catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" 
        placeholder="write a comment" 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>
      {isLoading ? "loading..." 
      : data.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
