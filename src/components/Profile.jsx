import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePageContainer = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content:center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  text-align: center;

  h2 {
    color: #007bff;
  }
`;

const ProfileInfo = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const Img = styled.div`
  img {
    width: 200px;
  }
`;

const Content = styled.div`
  padding: 10px;
  button {
    width: 100%;

    border: none;
    background-color: #007bff;
    color: #fff;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const handlebuttonclick = () => {
    localStorage.removeItem("accessToken");
    toast.success("Signed Out succesfully");
    navigate("/");
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          toast.error("You are not authenticated");
          navigate("/");
          return;
        }

        const response = await axios.get(
          "https://dev.api.infigon.app/user/get-profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error while requesting data");
        navigate("/");
      }
    };

    getProfileData();
  }, [navigate]);

  return (
    <ProfilePageContainer>
      <Img>
        <img
          src="https://static.vecteezy.com/system/resources/previews/007/226/475/original/user-account-circle-glyph-color-icon-user-profile-picture-userpic-silhouette-symbol-on-white-background-with-no-outline-negative-space-illustration-vector.jpg"
          alt="user-img"
        ></img>
      </Img>
      <Content>
        <h2>Welcome User, you are authenticated</h2>
        <ProfileInfo>User Data ...</ProfileInfo>
        <button onClick={handlebuttonclick}>Sign Out</button>
      </Content>
    </ProfilePageContainer>
  );
};

export default Profile;
