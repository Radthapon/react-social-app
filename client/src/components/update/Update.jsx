import React, { useState } from 'react'
import './update.scss'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from 'react-query';
import { makeRequset } from '../../axios';


export const Update = ({setOpenUpdate, userData }) => {

  const [cover, setCover] = useState(null)
  const [profile,setProfile] = useState(null)
  const [texts,setTexts] = useState({
    email:userData.email,
    name:userData.name,
    city:userData.city,
    website:userData.website,
  })

  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequset.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequset.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleUpdate = async (e) => {
    e.preventDefault()
    let coverUrl;
    let profileUrl;
    coverUrl = cover? await upload(cover) : userData.coverPic;
    profileUrl = profile? await upload(profile) : userData.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };



return (
    <div className="update">
          <div className="wrapper">
            <h1>Update Your Profile</h1>
            <form>
              <div className="files">
                <label htmlFor="cover">
                  <span>Cover Picture</span>
                  <div className="imgContainer">
                    <img src=""
                      alt=""
                    />
                    <CloudUploadIcon className="icon" />
                  </div>
                </label>
                <input
                  type="file"
                  id="cover"
                  style={{ display: "none" }}
                />
                <label htmlFor="profile">
                  <span>Profile Picture</span>
                  <div className="imgContainer">
                    <img
                      src=""
                      alt=""
                      onChange={(e) => setCover(e.target.files[0])}
                    />
                    <CloudUploadIcon className="icon" />
                  </div>
                </label>
                <input
                  type="file"
                  id="profile"
                  style={{ display: "none" }}
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={texts.email || ''}
                onChange={handleChange}            
              />

              <label>Name</label>
              <input
                type="text"
                name="name"
                value={texts.name || ''}
                onChange={handleChange}
              />
              <label>Country / City</label>
              <input
                type="text"
                name="city"
                value={texts.city || ''}
                onChange={handleChange}          
              />
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={texts.website || ''}
                onChange={handleChange}
              />
              <button onClick={handleUpdate}>Update</button>
            </form>
            <button onClick={(e)=> setOpenUpdate(false)}>
              close
            </button>
          </div>
        </div>
      );
};
