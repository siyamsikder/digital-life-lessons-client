import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser, updateUserProfileDB } from "../../../Hooks";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

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
      <h2 className="text-2xl font-bold mb-6 text-heading">Edit Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Photo */}
        <div className="flex items-center gap-4">
          <img
            src={dbUser.photoURL}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file-input file-input-sm "
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-soft mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-base rounded-lg px-3 py-2 bg-base"
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block text-sm text-soft mb-1">Email</label>
          <input
            type="email"
            value={dbUser.email}
            disabled
            className="w-full border border-base rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
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
