import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import { Button } from "../../../components/shared/Button";
import axios from "axios";
import { Header } from "../../../components/shared/Header";
import { set } from "firebase/database";

export const AdminProfile = () => {
  const {adminEmail, adminFullName, adminPhoneNumber} = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    setEmail(adminEmail)
    // setName(adminFullName)
    setPhoneNumber(adminPhoneNumber)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true)
    if (isEditing) {
    const fullName = name;
    const adminData = { fullName, email, phoneNumber, password };
    await axios
      .post("https://ncs-cbt-api.onrender.com/admin/register", adminData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(adminData, res);
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message)
      });

    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setIsEditing(false)
    }
  };

  return (
    <div className="p-8 md:p-10">
      <Header title="Admin Profile" />
      <form
        className="py-6 flex flex-col gap-6 w-full px-2 md:pl-8"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex w-full gap-6 flex-col md:flex-row">
        <label className="flex flex-col gap-4 w-full">
          <span className="text-xl">Full Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
            disabled={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-4 w-full">
          <span className="text-xl">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
            disabled={!isEditing}
          />
        </label>
        </div>
        <div className="flex w-full gap-6 flex-col md:flex-row">
        <label className="flex flex-col gap-4 w-full">
          <span className="text-xl">Phone Number</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
            disabled={!isEditing}
          />
        </label>
        <label className="flex flex-col gap-4 w-full">
          <span className="text-xl">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
          />
        </label>
        </div>
      </form>
      <div className="flex md:w-2/3 py-10 px-2 md:pl-8">
        <Button
          title="Update Profile"
          btnClick={handleSubmit}
          btnStyles={`px-4 py-3 rounded-md ${!isEditing && "bg-grey"} ${isEditing && "bg-primary"} text-white w-full`}
          // disable={!isEditing}
        />
      </div>
    </div>
  );
};
