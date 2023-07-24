import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequset } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";


const Profile = () => {
    const queryClient = useQueryClient();
    const {currentUser} = useContext(AuthContext);

    const userId = parseInt(useLocation().pathname.split("/")[2])

    // get user profile
    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequset.get("/users/find/" + userId).then((res) => {
        return res.data;
      })
    );

        // get follwed user profile
    const { isLoading:risLoading,data: relationshipData } = useQuery(["relationship"], () =>
        makeRequset.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
    );
    const checkUserFollow = relationshipData?.includes(currentUser.id)


    const mutation = useMutation((follow)=> {
      if (follow) return makeRequset.delete("/relationships?userFollow="+userId)
      return makeRequset.post("/relationships", {userId:currentUser.id, userFollow:userId})
    },{
      onSuccess:()=>{
        queryClient.invalidateQueries(["relationship"])
      },
    }
  );

  const handleFollow = async (e) => {
    e.preventDefault();
    try{
      mutation.mutate(relationshipData.includes(currentUser.id));
    } catch(err){
      console.log(err);
    };
  };


  return (
    <>
    {isLoading ? (
      "logding..."
    ): 
      <div className="profile">
        <div className="images">
          <img
            src={data?.coverPic}
            alt=""
            className="cover"
          />
          <img
            src={data?.profilePic}
            alt=""
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <PinterestIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <span>{data?.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{data?.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>{data?.website}</span>
                </div>
              </div>
              {risLoading ? "londing..." : userId === currentUser.id ? (
                <button>update</button>
              ) : (
                <button onClick={handleFollow}>
                  {checkUserFollow
                  ? "Following"
                  : "follow"}
                </button>
              )} 
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
        <Posts userId={userId}/>
        </div>
      </div>
    }  
    </>   
  );
};

export default Profile;
