import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import useLogout from "./LogOut";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const logout = useLogout();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., redirect to login if unauthorized
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    fetchProfile();
  }, [logout]);

  return (
    <div>
      <h2>Profile Page</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          {/* Display other profile information here */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
