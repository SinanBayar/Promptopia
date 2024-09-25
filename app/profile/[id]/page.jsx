"use client";

import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");
  const profileId = params.id;

  const [myPosts, setMyPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${profileId}/posts`);
      const data = await response.json();
      setMyPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchPosts();
    }
  }, [profileId]);

  return (
    <div>
      <Profile
        name={`${profileName}'s`}
        desc={`Welcome to ${profileName}'s personalized profile page.`}
        data={myPosts}
      />
    </div>
  );
};

export default UserProfile;
