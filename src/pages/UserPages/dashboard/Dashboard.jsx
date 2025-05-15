import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../../../store/userStore";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";

export const Dashboard = () => {
  const { setIsLoggedIn } = useUserStore();
  const [active, setActive] = useState("dashboardmain");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedInUser } = useUserStore();
  let userName = loggedInUser ? loggedInUser : "";
  const path = window.location.pathname;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userName === "") {
      navigate("/");
    } else {
      if (path === "/dashboard/overview") {
        setActive("dashboardmain");
        navigate("/dashboard/overview");
      }
      if (path === "/dashboard/material") {
        setActive("material");
        navigate("/dashboard/material");
      }
      if (path === "/dashboard/practice") {
        setActive("practice");
        navigate("/dashboard/practice");
      }
      if (path === "/dashboard/exam") {
        setActive("exam");
        navigate("/dashboard/exam");
      }
    }
  }, []);

  useEffect(() => {
    // Set a timeout for one hour (3600000 milliseconds)
    const timeout = setTimeout(() => {
      setShowModal(true); // Show the modal after one hour
    }, 3600000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const handleModalConfirmation = () => {
    // Redirect the user to the login screen
    navigate("/login");
    setShowModal(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfile = () => {
    setIsMenuOpen(false);
    navigate("/dashboard/user-profile");
  };

  return (
    <>
      {showModal && (
        <Modal
          content={
            <div className="text-lg my-4">
              Your session has expired. Please log in again to continue
            </div>
          }
          buttons={
            <div className="flex justify-center">
              {" "}
              <Button
                btnClick={handleModalConfirmation}
                title="Log In"
                btnStyles="px-4 py-3 rounded-md bg-primary text-white w-fit"
              />
            </div>
          }
          // closeModal={() => setShowModal(false)}
          modStyles="bg-secondary"
        />
      )}
      <section className="hidden md:flex bg-vector w-full h-full max-h-screen transform transition-all duration-300">
        <div className="flex flex-col items-center w-80 bg-white text-grey py-10 px-4">
          <div
            className={
              active === "dashboardmain"
                ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-2`
                : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-2`
            }
            onClick={() => {
              setActive("dashboardmain");
              navigate("/dashboard/overview");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.4015 4.87313L11.853 1.11233C10.3208 -0.154449 8.16109 -0.154449 6.62893 1.11233L2.08037 4.87313C1.26088 5.55069 0.795898 6.57801 0.795898 7.64989V14.4124C0.795898 15.821 1.8823 17.0524 3.32942 17.0524H5.01843C6.41765 17.0524 7.55195 15.9181 7.55195 14.5188V11.7191C7.55195 11.1445 7.97791 10.7681 8.39645 10.7681H10.0855C10.504 10.7681 10.93 11.1445 10.93 11.7191V14.5188C10.93 15.9181 12.0642 17.0524 13.4635 17.0524H15.1525C16.5996 17.0524 17.686 15.821 17.686 14.4124V7.64989C17.686 6.57801 17.221 5.55069 16.4015 4.87313Z"
                fill={active === "dashboardmain" ? "white" : "#8A898D"}
              />
            </svg>
            <p className="">Dashboard</p>
          </div>
          <div
            className={
              active === "material"
                ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-2`
                : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-2`
            }
            onClick={() => {
              setActive("material");
              navigate("/dashboard/material");
            }}
          >
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.6657 1.24453V17.2066C17.6657 17.4183 17.5816 17.6213 17.4319 17.7709C17.2822 17.9206 17.0792 18.0047 16.8676 18.0047H3.29983C2.87649 18.0047 2.47049 18.1729 2.17114 18.4722C1.8718 18.7715 1.70363 19.1775 1.70363 19.6009H15.2714C15.483 19.6009 15.686 19.685 15.8357 19.8346C15.9854 19.9843 16.0695 20.1873 16.0695 20.399C16.0695 20.6107 15.9854 20.8137 15.8357 20.9633C15.686 21.113 15.483 21.1971 15.2714 21.1971H0.905524C0.693855 21.1971 0.490854 21.113 0.341181 20.9633C0.191508 20.8137 0.107422 20.6107 0.107422 20.399V3.63884C0.107422 2.79216 0.443764 1.98015 1.04246 1.38146C1.64115 0.782769 2.45315 0.446426 3.29983 0.446426H16.8676C17.0792 0.446426 17.2822 0.530512 17.4319 0.680185C17.5816 0.829858 17.6657 1.03286 17.6657 1.24453Z"
                fill={active === "material" ? "white" : "#8A898D"}
              />
            </svg>
            <p className="">Material</p>
          </div>
          <div
            className={
              active === "practice"
                ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-2`
                : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-2`
            }
            onClick={() => {
              setActive("practice");
              navigate("/dashboard/practice");
            }}
          >
            <svg
              width="21"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3931 11.2506H18.6789V2.67914C18.6789 2.11081 18.4531 1.56577 18.0512 1.16391C17.6494 0.762043 17.1043 0.536278 16.536 0.536278H3.67885C3.11053 0.536278 2.56549 0.762043 2.16362 1.16391C1.76176 1.56577 1.53599 2.11081 1.53599 2.67914V11.2506H0.821708C0.632267 11.2506 0.450586 11.3258 0.316631 11.4598C0.182677 11.5937 0.107422 11.7754 0.107422 11.9648V13.3934C0.107422 13.9617 0.333187 14.5068 0.73505 14.9086C1.13691 15.3105 1.68196 15.5363 2.25028 15.5363H17.9646C18.5329 15.5363 19.0779 15.3105 19.4798 14.9086C19.8817 14.5068 20.1074 13.9617 20.1074 13.3934V11.9648C20.1074 11.7754 20.0322 11.5937 19.8982 11.4598C19.7643 11.3258 19.5826 11.2506 19.3931 11.2506ZM8.67885 2.67914H11.536C11.7254 2.67914 11.9071 2.75439 12.0411 2.88834C12.175 3.0223 12.2503 3.20398 12.2503 3.39342C12.2503 3.58286 12.175 3.76454 12.0411 3.8985C11.9071 4.03245 11.7254 4.10771 11.536 4.10771H8.67885C8.48941 4.10771 8.30773 4.03245 8.17377 3.8985C8.03982 3.76454 7.96456 3.58286 7.96456 3.39342C7.96456 3.20398 8.03982 3.0223 8.17377 2.88834C8.30773 2.75439 8.48941 2.67914 8.67885 2.67914ZM18.6789 13.3934C18.6789 13.5829 18.6036 13.7645 18.4696 13.8985C18.3357 14.0325 18.154 14.1077 17.9646 14.1077H2.25028C2.06084 14.1077 1.87916 14.0325 1.7452 13.8985C1.61125 13.7645 1.53599 13.5829 1.53599 13.3934V12.6791H18.6789V13.3934Z"
                fill={active === "practice" ? "white" : "#8A898D"}
              />
            </svg>
            <p className="">Practice</p>
          </div>
          <div
            className={
              active === "exam"
                ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-2`
                : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-2`
            }
            onClick={() => {
              setActive("exam");
              navigate("/dashboard/exam");
            }}
          >
            <svg
              width="21"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3931 11.2506H18.6789V2.67914C18.6789 2.11081 18.4531 1.56577 18.0512 1.16391C17.6494 0.762043 17.1043 0.536278 16.536 0.536278H3.67885C3.11053 0.536278 2.56549 0.762043 2.16362 1.16391C1.76176 1.56577 1.53599 2.11081 1.53599 2.67914V11.2506H0.821708C0.632267 11.2506 0.450586 11.3258 0.316631 11.4598C0.182677 11.5937 0.107422 11.7754 0.107422 11.9648V13.3934C0.107422 13.9617 0.333187 14.5068 0.73505 14.9086C1.13691 15.3105 1.68196 15.5363 2.25028 15.5363H17.9646C18.5329 15.5363 19.0779 15.3105 19.4798 14.9086C19.8817 14.5068 20.1074 13.9617 20.1074 13.3934V11.9648C20.1074 11.7754 20.0322 11.5937 19.8982 11.4598C19.7643 11.3258 19.5826 11.2506 19.3931 11.2506ZM8.67885 2.67914H11.536C11.7254 2.67914 11.9071 2.75439 12.0411 2.88834C12.175 3.0223 12.2503 3.20398 12.2503 3.39342C12.2503 3.58286 12.175 3.76454 12.0411 3.8985C11.9071 4.03245 11.7254 4.10771 11.536 4.10771H8.67885C8.48941 4.10771 8.30773 4.03245 8.17377 3.8985C8.03982 3.76454 7.96456 3.58286 7.96456 3.39342C7.96456 3.20398 8.03982 3.0223 8.17377 2.88834C8.30773 2.75439 8.48941 2.67914 8.67885 2.67914ZM18.6789 13.3934C18.6789 13.5829 18.6036 13.7645 18.4696 13.8985C18.3357 14.0325 18.154 14.1077 17.9646 14.1077H2.25028C2.06084 14.1077 1.87916 14.0325 1.7452 13.8985C1.61125 13.7645 1.53599 13.5829 1.53599 13.3934V12.6791H18.6789V13.3934Z"
                fill={active === "exam" ? "white" : "#8A898D"}
              />
            </svg>
            <p className="">Exam</p>
          </div>
          <div
            className={
              active === "logout"
                ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-2`
                : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-2`
            }
            onClick={() => {
              setActive("logout");
              setIsLoggedIn(false);
              navigate("/login");
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.087 9.51488H5.95105C5.42661 9.51488 5.00098 9.94051 5.00098 10.4649C5.00098 10.9894 5.42661 11.415 5.95105 11.415H16.1092L14.1368 13.3874C13.7663 13.7579 13.7663 14.3602 14.1368 14.7308C14.508 15.1019 15.1097 15.1019 15.4809 14.7308C15.4809 14.7308 17.1068 13.1049 18.1677 12.044C19.0335 11.1781 19.0335 9.77456 18.1677 8.90874L15.4809 6.22131C15.1097 5.85078 14.508 5.85078 14.1368 6.22131C13.7663 6.59247 13.7663 7.19418 14.1368 7.56534L16.087 9.51488Z"
                fill={active === "logout" ? "white" : "#8A898D"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.7748 15.5321V12.6819H5.95074C4.72706 12.6819 3.73392 11.6888 3.73392 10.4651C3.73392 9.24142 4.72706 8.24828 5.95074 8.24828H12.7748V5.39808C12.7748 3.64932 11.3566 2.23118 9.60788 2.23118C8.23598 2.23118 6.54612 2.23118 5.17422 2.23118C4.33436 2.23118 3.5287 2.56497 2.93459 3.15845C2.34112 3.75256 2.00732 4.55822 2.00732 5.39808C2.00732 8.20965 2.00732 12.7206 2.00732 15.5321C2.00732 16.372 2.34112 17.1777 2.93459 17.7718C3.5287 18.3653 4.33436 18.699 5.17422 18.699C6.54612 18.699 8.23598 18.699 9.60788 18.699C10.4477 18.699 11.2534 18.3653 11.8475 17.7718C12.441 17.1777 12.7748 16.372 12.7748 15.5321Z"
                fill={active === "logout" ? "white" : "#8A898D"}
              />
            </svg>
            <p className="">Log out</p>
          </div>
        </div>
        <div className="row-start-2 col-start-2 overflow-y-auto w-full">
          <Outlet />
        </div>
      </section>
      {/* mobile dashboard nav */}
      <section className="md:hidden flex justify-between bg-vector h-full max-h-screen">
        {isMenuOpen && (
          <div className="flex flex-col items-center absolute left-0 bottom-0 top-0 bg-white text-grey py-10 px-8 z-10 w-3/4">
            <div className="flex justify-between w-full mb-6">
              <div
                className="flex flex-col md:flex-row md:items-center cursor-pointer md:gap-4"
                onClick={handleProfile}
              >
                <img alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <span className="font-bold text-darkgrey text-lg max-w-30">
                    {userName}
                  </span>
                </div>
              </div>
              <Button
                title={
                  <svg
                    width="34"
                    height="29"
                    viewBox="0 0 34 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34 12.75V15.5833C34 15.9591 33.8507 16.3194 33.5851 16.5851C33.3194 16.8507 32.9591 17 32.5833 17H1.41667C1.04094 17 0.680609 16.8507 0.414932 16.5851C0.149256 16.3194 0 15.9591 0 15.5833V12.75C0 12.3743 0.149256 12.0139 0.414932 11.7483C0.680609 11.4826 1.04094 11.3333 1.41667 11.3333H32.5833C32.9591 11.3333 33.3194 11.4826 33.5851 11.7483C33.8507 12.0139 34 12.3743 34 12.75ZM32.5833 22.6667H1.41667C1.04094 22.6667 0.680609 22.8159 0.414932 23.0816C0.149256 23.3473 0 23.7076 0 24.0833V26.9167C0 27.2924 0.149256 27.6527 0.414932 27.9184C0.680609 28.1841 1.04094 28.3333 1.41667 28.3333H32.5833C32.9591 28.3333 33.3194 28.1841 33.5851 27.9184C33.8507 27.6527 34 27.2924 34 26.9167V24.0833C34 23.7076 33.8507 23.3473 33.5851 23.0816C33.3194 22.8159 32.9591 22.6667 32.5833 22.6667ZM32.5833 0H1.41667C1.04094 0 0.680609 0.149256 0.414932 0.414932C0.149256 0.680609 0 1.04094 0 1.41667V4.25C0 4.62572 0.149256 4.98606 0.414932 5.25173C0.680609 5.51741 1.04094 5.66667 1.41667 5.66667H32.5833C32.9591 5.66667 33.3194 5.51741 33.5851 5.25173C33.8507 4.98606 34 4.62572 34 4.25V1.41667C34 1.04094 33.8507 0.680609 33.5851 0.414932C33.3194 0.149256 32.9591 0 32.5833 0Z"
                      fill="#016F4A"
                    />
                  </svg>
                }
                btnClick={toggleMenu}
                btnStyles=""
              />
            </div>
            <div
              className={
                active === "dashboardmain"
                  ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-4`
                  : `flex items-center hover:bg-active px-4 py-3 w-full cursor-pointer rounded-full my-2 gap-4`
              }
              onClick={() => {
                setActive("dashboardmain");
                setIsMenuOpen(false);
                navigate("/dashboard/overview");
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-26 h-26"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.4015 4.87313L11.853 1.11233C10.3208 -0.154449 8.16109 -0.154449 6.62893 1.11233L2.08037 4.87313C1.26088 5.55069 0.795898 6.57801 0.795898 7.64989V14.4124C0.795898 15.821 1.8823 17.0524 3.32942 17.0524H5.01843C6.41765 17.0524 7.55195 15.9181 7.55195 14.5188V11.7191C7.55195 11.1445 7.97791 10.7681 8.39645 10.7681H10.0855C10.504 10.7681 10.93 11.1445 10.93 11.7191V14.5188C10.93 15.9181 12.0642 17.0524 13.4635 17.0524H15.1525C16.5996 17.0524 17.686 15.821 17.686 14.4124V7.64989C17.686 6.57801 17.221 5.55069 16.4015 4.87313Z"
                  fill={active === "dashboardmain" ? "white" : "#8A898D"}
                />
              </svg>
              <p>Overview</p>
            </div>
            <div
              className={
                active === "material"
                  ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-4`
                  : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-4`
              }
              onClick={() => {
                setActive("material");
                setIsMenuOpen(false);
                navigate("/dashboard/material");
              }}
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6657 1.24453V17.2066C17.6657 17.4183 17.5816 17.6213 17.4319 17.7709C17.2822 17.9206 17.0792 18.0047 16.8676 18.0047H3.29983C2.87649 18.0047 2.47049 18.1729 2.17114 18.4722C1.8718 18.7715 1.70363 19.1775 1.70363 19.6009H15.2714C15.483 19.6009 15.686 19.685 15.8357 19.8346C15.9854 19.9843 16.0695 20.1873 16.0695 20.399C16.0695 20.6107 15.9854 20.8137 15.8357 20.9633C15.686 21.113 15.483 21.1971 15.2714 21.1971H0.905524C0.693855 21.1971 0.490854 21.113 0.341181 20.9633C0.191508 20.8137 0.107422 20.6107 0.107422 20.399V3.63884C0.107422 2.79216 0.443764 1.98015 1.04246 1.38146C1.64115 0.782769 2.45315 0.446426 3.29983 0.446426H16.8676C17.0792 0.446426 17.2822 0.530512 17.4319 0.680185C17.5816 0.829858 17.6657 1.03286 17.6657 1.24453Z"
                  fill={active === "material" ? "white" : "#8A898D"}
                />
              </svg>
              <p className="">Material</p>
            </div>
            <div
              className={
                active === "practice"
                  ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-4`
                  : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-4`
              }
              onClick={() => {
                setActive("practice");
                setIsMenuOpen(false);
                navigate("/dashboard/practice");
              }}
            >
              <svg
                width="21"
                height="16"
                viewBox="0 0 21 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3931 11.2506H18.6789V2.67914C18.6789 2.11081 18.4531 1.56577 18.0512 1.16391C17.6494 0.762043 17.1043 0.536278 16.536 0.536278H3.67885C3.11053 0.536278 2.56549 0.762043 2.16362 1.16391C1.76176 1.56577 1.53599 2.11081 1.53599 2.67914V11.2506H0.821708C0.632267 11.2506 0.450586 11.3258 0.316631 11.4598C0.182677 11.5937 0.107422 11.7754 0.107422 11.9648V13.3934C0.107422 13.9617 0.333187 14.5068 0.73505 14.9086C1.13691 15.3105 1.68196 15.5363 2.25028 15.5363H17.9646C18.5329 15.5363 19.0779 15.3105 19.4798 14.9086C19.8817 14.5068 20.1074 13.9617 20.1074 13.3934V11.9648C20.1074 11.7754 20.0322 11.5937 19.8982 11.4598C19.7643 11.3258 19.5826 11.2506 19.3931 11.2506ZM8.67885 2.67914H11.536C11.7254 2.67914 11.9071 2.75439 12.0411 2.88834C12.175 3.0223 12.2503 3.20398 12.2503 3.39342C12.2503 3.58286 12.175 3.76454 12.0411 3.8985C11.9071 4.03245 11.7254 4.10771 11.536 4.10771H8.67885C8.48941 4.10771 8.30773 4.03245 8.17377 3.8985C8.03982 3.76454 7.96456 3.58286 7.96456 3.39342C7.96456 3.20398 8.03982 3.0223 8.17377 2.88834C8.30773 2.75439 8.48941 2.67914 8.67885 2.67914ZM18.6789 13.3934C18.6789 13.5829 18.6036 13.7645 18.4696 13.8985C18.3357 14.0325 18.154 14.1077 17.9646 14.1077H2.25028C2.06084 14.1077 1.87916 14.0325 1.7452 13.8985C1.61125 13.7645 1.53599 13.5829 1.53599 13.3934V12.6791H18.6789V13.3934Z"
                  fill={active === "practice" ? "white" : "#8A898D"}
                />
              </svg>
              <p className="">Practice</p>
            </div>
            <div
              className={
                active === "exam"
                  ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-4`
                  : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-4`
              }
              onClick={() => {
                setActive("exam");
                setIsMenuOpen(false);
                navigate("/dashboard/exam");
              }}
            >
              <svg
                width="21"
                height="16"
                viewBox="0 0 21 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3931 11.2506H18.6789V2.67914C18.6789 2.11081 18.4531 1.56577 18.0512 1.16391C17.6494 0.762043 17.1043 0.536278 16.536 0.536278H3.67885C3.11053 0.536278 2.56549 0.762043 2.16362 1.16391C1.76176 1.56577 1.53599 2.11081 1.53599 2.67914V11.2506H0.821708C0.632267 11.2506 0.450586 11.3258 0.316631 11.4598C0.182677 11.5937 0.107422 11.7754 0.107422 11.9648V13.3934C0.107422 13.9617 0.333187 14.5068 0.73505 14.9086C1.13691 15.3105 1.68196 15.5363 2.25028 15.5363H17.9646C18.5329 15.5363 19.0779 15.3105 19.4798 14.9086C19.8817 14.5068 20.1074 13.9617 20.1074 13.3934V11.9648C20.1074 11.7754 20.0322 11.5937 19.8982 11.4598C19.7643 11.3258 19.5826 11.2506 19.3931 11.2506ZM8.67885 2.67914H11.536C11.7254 2.67914 11.9071 2.75439 12.0411 2.88834C12.175 3.0223 12.2503 3.20398 12.2503 3.39342C12.2503 3.58286 12.175 3.76454 12.0411 3.8985C11.9071 4.03245 11.7254 4.10771 11.536 4.10771H8.67885C8.48941 4.10771 8.30773 4.03245 8.17377 3.8985C8.03982 3.76454 7.96456 3.58286 7.96456 3.39342C7.96456 3.20398 8.03982 3.0223 8.17377 2.88834C8.30773 2.75439 8.48941 2.67914 8.67885 2.67914ZM18.6789 13.3934C18.6789 13.5829 18.6036 13.7645 18.4696 13.8985C18.3357 14.0325 18.154 14.1077 17.9646 14.1077H2.25028C2.06084 14.1077 1.87916 14.0325 1.7452 13.8985C1.61125 13.7645 1.53599 13.5829 1.53599 13.3934V12.6791H18.6789V13.3934Z"
                  fill={active === "exam" ? "white" : "#8A898D"}
                />
              </svg>
              <p className="">Exam</p>
            </div>
            <div
              className={
                active === "logout"
                  ? `flex items-center bg-primary text-white px-4 w-full py-3 cursor-pointer rounded-md my-2 gap-4`
                  : `flex items-center hover:bg-active px-4 w-full py-3 cursor-pointer rounded-full my-2 gap-4`
              }
              onClick={() => {
                setActive("logout");
                setIsLoggedIn(false);
                navigate("/login");
              }}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.087 9.51488H5.95105C5.42661 9.51488 5.00098 9.94051 5.00098 10.4649C5.00098 10.9894 5.42661 11.415 5.95105 11.415H16.1092L14.1368 13.3874C13.7663 13.7579 13.7663 14.3602 14.1368 14.7308C14.508 15.1019 15.1097 15.1019 15.4809 14.7308C15.4809 14.7308 17.1068 13.1049 18.1677 12.044C19.0335 11.1781 19.0335 9.77456 18.1677 8.90874L15.4809 6.22131C15.1097 5.85078 14.508 5.85078 14.1368 6.22131C13.7663 6.59247 13.7663 7.19418 14.1368 7.56534L16.087 9.51488Z"
                  fill={active === "logout" ? "white" : "#8A898D"}
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7748 15.5321V12.6819H5.95074C4.72706 12.6819 3.73392 11.6888 3.73392 10.4651C3.73392 9.24142 4.72706 8.24828 5.95074 8.24828H12.7748V5.39808C12.7748 3.64932 11.3566 2.23118 9.60788 2.23118C8.23598 2.23118 6.54612 2.23118 5.17422 2.23118C4.33436 2.23118 3.5287 2.56497 2.93459 3.15845C2.34112 3.75256 2.00732 4.55822 2.00732 5.39808C2.00732 8.20965 2.00732 12.7206 2.00732 15.5321C2.00732 16.372 2.34112 17.1777 2.93459 17.7718C3.5287 18.3653 4.33436 18.699 5.17422 18.699C6.54612 18.699 8.23598 18.699 9.60788 18.699C10.4477 18.699 11.2534 18.3653 11.8475 17.7718C12.441 17.1777 12.7748 16.372 12.7748 15.5321Z"
                  fill={active === "logout" ? "white" : "#8A898D"}
                />
              </svg>
              <p className="">Log out</p>
            </div>
          </div>
        )}
        <div className="overflow-y-auto w-full">
          <div
            className={`flex w-full justify-end mt-6 px-10 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            <Button
              title={
                <svg
                  width="34"
                  height="29"
                  viewBox="0 0 34 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34 12.75V15.5833C34 15.9591 33.8507 16.3194 33.5851 16.5851C33.3194 16.8507 32.9591 17 32.5833 17H1.41667C1.04094 17 0.680609 16.8507 0.414932 16.5851C0.149256 16.3194 0 15.9591 0 15.5833V12.75C0 12.3743 0.149256 12.0139 0.414932 11.7483C0.680609 11.4826 1.04094 11.3333 1.41667 11.3333H32.5833C32.9591 11.3333 33.3194 11.4826 33.5851 11.7483C33.8507 12.0139 34 12.3743 34 12.75ZM32.5833 22.6667H1.41667C1.04094 22.6667 0.680609 22.8159 0.414932 23.0816C0.149256 23.3473 0 23.7076 0 24.0833V26.9167C0 27.2924 0.149256 27.6527 0.414932 27.9184C0.680609 28.1841 1.04094 28.3333 1.41667 28.3333H32.5833C32.9591 28.3333 33.3194 28.1841 33.5851 27.9184C33.8507 27.6527 34 27.2924 34 26.9167V24.0833C34 23.7076 33.8507 23.3473 33.5851 23.0816C33.3194 22.8159 32.9591 22.6667 32.5833 22.6667ZM32.5833 0H1.41667C1.04094 0 0.680609 0.149256 0.414932 0.414932C0.149256 0.680609 0 1.04094 0 1.41667V4.25C0 4.62572 0.149256 4.98606 0.414932 5.25173C0.680609 5.51741 1.04094 5.66667 1.41667 5.66667H32.5833C32.9591 5.66667 33.3194 5.51741 33.5851 5.25173C33.8507 4.98606 34 4.62572 34 4.25V1.41667C34 1.04094 33.8507 0.680609 33.5851 0.414932C33.3194 0.149256 32.9591 0 32.5833 0Z"
                    fill="#016F4A"
                  />
                </svg>
              }
              btnClick={toggleMenu}
              btnStyles=""
            />
          </div>
          <Outlet />
        </div>
      </section>
    </>
  );
};
