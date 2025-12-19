import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser, updateUserProfileDB } from "../../../Hooks";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const { role, isRoleLoading } = useRole();

  const imgbbAPIKey = import.meta.env.VITE_IMAGE_HOST;

  useEffect(() => {
    if (user?.email) {
      getUser(user.email).then((data) => {
        setDbUser(data);
        setName(data.name);
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let photoURL = dbUser.photoURL;
      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);

        const uploadURL = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;
        const imgRes = await axios.post(uploadURL, formData);
        photoURL = imgRes.data.data.url;
      }
      await updateUserProfile({
        displayName: name,
        photoURL,
      });
      await updateUserProfileDB(user.email, {
        name,
        photoURL,
      });
      setDbUser({ ...dbUser, name, photoURL });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been updated successfully.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (!dbUser)
    return <p className="text-center mt-10 taxt-primary">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-15 p-6 bg-base rounded-xl shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-heading">Edit Profile</h2>

        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
          {role?.toUpperCase()}
        </span>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Profile Photo */}
        <div className="space-y-3">
          <img
            src={dbUser.photoURL}
            className="w-24 h-24 rounded-full object-cover border mx-auto"
          />
        </div>
        {/* img */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file-input bg-base file-input-sm w-full"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-base"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={dbUser.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:scale-105 transition">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
