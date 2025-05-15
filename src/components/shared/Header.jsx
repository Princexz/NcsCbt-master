import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAdminStore } from '../../store/adminStore';
import { useUserStore } from "../../store/userStore";

export const Header = ({ title }) => {
  const navigate = useNavigate();
  const { loggedInUser, userImage, userIsAdmin, userIsUser } = useUserStore();
  let userName = loggedInUser ? loggedInUser : "";
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);


  useEffect(() => {
    if (userName === "") {
      if (userIsAdmin) {
      navigate("/admin");
      }
      if (userIsUser) {
        navigate("/login");
        }
    }
  }, [userName]);


  const handleProfile = () => {
    navigate("/dashboard/user-profile");
  };

  return (
    <header className="py-4 flex justify-between items-center w-full  ">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-darkgrey">{title}</h1>
        <p className="text-sm text-grey">
          Welcome, <span>{userName}</span>
        </p>
      </div>
      <div
        className={`hidden ${path === '/take-exam' || userIsAdmin ? "md:hidden" : "md:flex"} items-center cursor-pointer`}
        onClick={handleProfile}
      >
        <img
          src={userImage}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2 object-cover"
        />
        <div>
          <span className="font-bold text-darkgrey">{userName}</span>
        </div>
      </div>
    </header>
  );
};
