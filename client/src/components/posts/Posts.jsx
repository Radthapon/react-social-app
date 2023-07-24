

import { makeRequset } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "react-query";

const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery(['posts'],() => 
    makeRequset.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  )

  return (
    <div className="posts">
    {error
      ? "Something went wrong!"
      : isLoading
      ? "loading....."
      : data.map((post, idx) => <Post post={post} key={idx} />)}
  </div>
  )
};

export default Posts;
