import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import axios from "axios";
import add from "../../../assets/add.png";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { ref, uploadBytes, getDownloadURL, updateMetadata } from "firebase/storage";
import { v4 } from "uuid";
import { imageStorage } from "../../../../config";

export const UserProfile = () => {
  const navigate = useNavigate();
  const { userImage, setUserImage } = useUserStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [rank, setRank] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const token = localStorage.getItem("auth-token");


  useEffect(() => {
    getUserDetails();
    if (userImage) {
    }
  }, [userImage]);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setUserAvatar(file);
    const examineeId = userId;
    const userDetails = { fullName, examineeId };
    const path = `images/${v4()}`
    const imageRef = ref(imageStorage, path);
    uploadBytes(imageRef, file)
    .then(() => {
        // Set custom metadata
        updateMetadata(imageRef, {
            customMetadata: {
                'userId': userId
            }
        }).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUserImage(url)
            })
        });
    })
};

  const getUserDetails = async () => {
    setIsLoading(true);
    axios
      .get("https://ncs-cbt-api.onrender.com/users/dashboard", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
      .then((res) => {
        const user = res.data.data;
        setFullName(user.fullName);
        setEmail(user.email);
        setUserId(user.examineeId);
        setRank(user.rank);
        setPhoneNumber(user.phoneNumber);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const editDetails = async () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (isValid) {
      const updatedUserData = { fullName, email, phoneNumber, password };
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/users/update-profile",
          updatedUserData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 201) {
          getUserDetails();
          setIsEditing(false);
          alert("Profile updated successfully");
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handlePasswordChange = () => {
    if (password === confirmPassword) {
      // Perform password change operation
      alert("Password changed successfully");
    } else {
      setError("Passwords do not match");
    }
  };

  const subscribe = async () => {
    const examineeId = userId;
    const plan = "Monthly";
    let userData = { plan, examineeId };
    try {
      const response = await axios.post(
        "https://ncs-cbt-api.onrender.com/users/subscribe",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const payment_url = response.data.data.authorization_url;
      if (
        confirm(
          "You'll be redirected to the payment page. If a new tab does not open immediately, allow pop-ups and redirect from this site in your browser",
        ) === true
      ) {
        window.open(payment_url, "_blank");
      }
      navigate("/dashboard/overview");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full p-8 md:p-10">
      <Header title="User Profile" />
      {isLoading === true ? (
        <div className="bg-cardgreen absolute inset-0 flex items-center justify-center mx-auto">
          <div className="rounded-full w-52 h-52 animate-bounce border-8 border-secondary"></div>
        </div>
      ) : (<div></div>)}
      <main className="flex-grow">
        <div className="flex items-center justify-between my-10">
          <div className="flex flex-col">
            <div className="rounded-md h-44 w-52 relative">
              {userImage !== null ? (
                <img
                  src={userImage}
                  alt="user avatar"
                  className="absolute h-44 w-52 rounded-xl object-cover mt-1 border border-primary"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="absolute h-44 w-52 rounded-md object-cover mt-2 border border-primary"
                />
              )}
            </div>
            <div className="flex relative cursor-pointer justify-end w-56">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  uploadImage(e);
                }}
                className="opacity-0 z-10 cursor-pointer"
              />
              <img
                src={add}
                alt="add avatar"
                className="opacity-60 absolute -mt-2"
              />
            </div>
          </div>
          <button
            className="px-4 py-3 rounded-md bg-primary text-white cursor-pointer"
            onClick={subscribe}
          >
            Subscribe
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <label htmlFor="fullName" className="w-1/3 block font-bold mb-2">
                Full Name
              </label>
              {isEditing && (
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setIsValid(true);
                  }}
                  className="w-1/2 px-4 py-2 rounded border"
                />
              )}
              {!isEditing && <div>{fullName}</div>}
            </div>
            <div className="flex justify-between">
              <label htmlFor="email" className="blow-1/3 ck font-bold mb-2">
                Email
              </label>
              {isEditing && (
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValid(true);
                  }}
                  className="w-1/2 px-4 py-2 rounded border"
                />
              )}
              {!isEditing && <div>{email}</div>}
            </div>
            <div className="flex justify-between">
              <label htmlFor="id" className="block w-1/3 font-bold mb-2">
                ID
              </label>
              {isEditing && (
                <input
                  type="text"
                  id="id"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setIsValid(true);
                  }}
                  className="w-1/2 px-4 py-2 rounded border"
                  disabled
                />
              )}
              {!isEditing && <div>{userId}</div>}
            </div>
            <div className="flex justify-between">
              <label htmlFor="rank" className="blocw-1/3 k font-bold mb-2">
                Rank
              </label>
              {isEditing && (
                <input
                  type="text"
                  id="rank"
                  value={rank}
                  onChange={(e) => {
                    setRank(e.target.value);
                    setIsValid(true);
                  }}
                  className="w-1/2 px-4 py-2 rounded border"
                  disabled
                />
              )}
              {!isEditing && <div>{rank}</div>}
            </div>
            <div className="flex justify-between">
              <label
                htmlFor="phoneNumber"
                className="w-1/3 block font-bold mb-2"
              >
                Phone Number
              </label>
              {isEditing && (
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setIsValid(true);
                  }}
                  className="w-1/2 px-4 py-2 rounded border"
                />
              )}
              {!isEditing && <div>{phoneNumber}</div>}
            </div>
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <div className="flex py-3 my-2"></div>
            ) : (
              // <Button title="Done" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={handleSaveClick} />
              <Button
                title="Edit"
                btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4"
                btnClick={() => {
                  setIsEditing(true);
                  editDetails();
                }}
              />
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Security</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <label
                htmlFor="newPassword"
                className="w-1/3 block font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-1/2 px-4 py-2 rounded border mb-4"
              />
            </div>
            <div className="flex justify-between">
              <label
                htmlFor="confirmPassword"
                className="w-1/2 block font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-1/2 px-4 py-2 rounded border mb-4"
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <div className="flex justify-end">
              <Button
                title="Change Password"
                btnStyles="bg-primary text-white py-2 px-4 rounded-md"
                btnClick={handlePasswordChange}
              />
            </div>
            {isEditing &&
              (isSaving ? (
                <button
                  className="border border-primary py-3 px-4 rounded-md my-4"
                  disabled
                >
                  Saving...
                </button>
              ) : (
                <Button
                  title="Save Changes"
                  btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4"
                  btnClick={handleSaveClick}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};
