import React, { useState } from "react";
import { Table } from "../../../components/shared/Table";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";
import { OverviewCard } from "../../../components/admin/OverviewCard";
import user from "../../../assets/user.png";
import axios from "axios";
import { useUserStore } from "../../../store/userStore";
import success from "../../../assets/upload.png";

const adminHeader = [
  { key: "id", label: "S/N" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email Address" },
  { key: "phoneNumber", label: "Phone Number" },
];

const userHeader = [
  { key: "id", label: "S/N" },
  { key: "examineeId", label: "Examinee ID" },
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email Address" },
  { key: "phoneNumber", label: "Phone Number" },

  // Add any other relevant columns for users
];

export const User = () => {
  const { users } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [handleCreate, setHandleCreate] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState(users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const regex = new RegExp(term, "i");
    const filteredUsers = users.filter(
      (user) =>
        regex.test(user.examineeId) ||
        regex.test(user.fullName) ||
        regex.test(user.email) ||
        regex.test(user.phoneNumber)
    );

    setDisplayedUsers(filteredUsers);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setDisplayedUsers(users);
  };

  const token = localStorage.getItem("auth-token");
  const handleSubmit = async () => {
    if (isValid) {
      setIsLoading(true);
      const fullName = name;
      const adminData = { fullName, email, phoneNumber, password };
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/admin/register",
          adminData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setShowModal(false);
        setHandleCreate(true);
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          console.log(err);
        } else if (err.response?.status === 409) {
          setError(err.response.data.message);
        } else {
          setError("Registration Failed");
        }
      }
    }
  };

  const cards = [
    {
      icon: user,
      value: users.length,
      label: "Users",
    },
  ];

  return (
    <div className="flex flex-col w-full p-8 md:p-10 gap-4">
      <Header title="Users" />
      <main className="flex-grow">
        <section className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col-reverse mb-4 justify-between items-center gap-8">
            <div className="relative flex md:w-2/3 w-full">
              <input
                type="text"
                className="border rounded-md py-3 px-4 w-full"
                placeholder="Search here..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {searchTerm && (
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
                    onClick={handleClearSearch}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                {!searchTerm && (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex w-full md:w-1/3 items-center justify-center gap-4">
              {cards.map((card, index) => (
                <div key={index} className="w-full">
                  <OverviewCard
                    cardStyles="justify-center py-3"
                    label={card.label}
                    cardValue={card.value}
                    icon={
                      <>
                        <img className="w-10" src={card.icon} alt={card.icon} />
                      </>
                    }
                  />
                </div>
              ))}
              <div className="w-full">
                <Button
                  title="Create Admin"
                  btnStyles="bg-primary rounded-md text-white px-4 py-3"
                  btnClick={() => setShowModal(true)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 w-full">
            <Table
              data={
                displayedUsers.length > 0
                  ? displayedUsers.map((user, index) => ({
                      ...user,
                      id: index + 1,
                    }))
                  : [{ id: 1, fullName: "No users" }]
              }
              columns={userHeader}
            />
          </div>
        </section>
      </main>
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          title="Create Admin"
          content={
            <div className="flex flex-col items-center gap-4 my-2">
              {error && <div className="text-sm text-red-500">{error}</div>}
              <div className="w-full flex flex-col">
                <label htmlFor="adminName">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value == "") {
                      setError("Name is required");
                      setIsValid(false);
                    }
                    setIsValid(true);
                    setError("");
                  }}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value == "") {
                      setError("Email is required");
                      setIsValid(false);
                    }
                    setIsValid(true);
                    setError("");
                  }}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Email Address"
                  required
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (e.target.value == "") {
                      setError("PhoneNumber is required");
                      setIsValid(false);
                    }
                    setIsValid(true);
                    setError("");
                  }}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value == "") {
                      setError("Password is required");
                      setIsValid(false);
                    }
                    setIsValid(true);
                    setError("");
                  }}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Password"
                />
              </div>
            </div>
          }
          buttons={
            <Button
              title={isLoading ? "Loading..." : "Create Admin"}
              btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5"
              btnClick={handleSubmit}
            />
          }
          modStyles="bg-secondary w-1/2"
        />
      )}
      {handleCreate && (
        <Modal
          content={
            <div className="flex flex-col gap-4 items-center justify-center py-10">
              <div className="motion-safe:animate-bounce duration-75">
                <img src={success} alt="sucess" />
              </div>
              <div className="text-primary text-3xl font-bold text-center">
                Admin created Successfully!
              </div>
            </div>
          }
          buttons={
            <Button
              title="Done"
              btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full"
              btnClick={() => setHandleCreate(false)}
            />
          }
          modStyles="bg-secondary w-1/2 transition duration-300 ease-in-out"
        />
      )}
    </div>
  );
};
