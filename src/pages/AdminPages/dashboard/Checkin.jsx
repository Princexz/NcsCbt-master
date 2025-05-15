import React, { useEffect, useState } from "react";
import { Table } from "../../../components/shared/Table";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";

const userHeader = [
  { key: "id", label: "S/N" },
  { key: "examineeId", label: "Examinee ID" },
  { key: "fullName", label: "Full Name" },
  { key: "rank", label: "Rank" },
  { key: "checkIn", label: "Checkin Time" },

  // Add any other relevant columns for users
];

export const Checkin = () => {
  const { users, checkedInUsers, setCheckedInUsers, isLoggedIn } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eID, setEID] = useState("");
  const [error, setError] = useState("");
  const [checkUser, setCheckuser] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState(checkedInUsers);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const storedDate = localStorage.getItem("adminLoginDate");
  
    if (storedDate !== currentDate) {
      setCheckedInUsers([]);
    }
  
    localStorage.setItem("adminLoginDate", currentDate);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const regex = new RegExp(term, "i");
    const filteredUsers = checkedInUsers.filter(
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

  const handleCheckIn = () => {
    if (eID === "") {
      setError("Enter Examinee ID!");
    } else {
      const userExists = users.some((user) => user.examineeId === eID);
      if (userExists) {
        const getUser = users.find((user) => user.examineeId === eID);
        getUser.checkIn = new Date().toLocaleTimeString();
        setCheckedInUsers([...checkedInUsers, getUser]);
        setCheckuser(true);
        setShowModal(false);
      } else {
        setError("Examinee ID not found!");
      }
    }
    setEID("");
  };

  return (
    <div className="flex flex-col w-full p-8 md:p-10  gap-4">
      <Header title="Check In" />
      <main className="flex-grow">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
            <div className="relative md:w-2/3 flex">
              <input
                type="text"
                className="border rounded-md py-2 px-4 pr-10 w-full"
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
            <div className="flex justify-end">
            <Button
              title="Check Examinee In"
              btnStyles="px-4 py-3 bg-primary rounded-md text-white"
              btnClick={() => setShowModal(!showModal)}
            />
            </div>
          </div>
          <div className="w-full">
          {!searchTerm && <Table data={users.length > 0 ? checkedInUsers.map((user, index) => ({ ...user, id: index + 1 })) : [{ id: 1, name: 'No Examinee is checked in yet' }]} columns={userHeader} />}
          {searchTerm && <Table data={displayedUsers.length > 0 ? displayedUsers.map((user, index) => ({ ...user, id: index + 1 })) : [{ id: 1, name: 'No Examinee is checked in yet' }]} columns={userHeader} />}
          </div>
        </section>
      </main>
      {showModal && (
        <Modal
          title="Check Examinee In"
          content={
            <div className="flex flex-col items-center gap-4 my-4">
              <div>
                <label htmlFor="examineeID">Examinee ID</label>
                <input
                  type="text"
                  value={eID}
                  onChange={(e) => {
                    setEID(e.target.value);
                    setError("");
                  }}
                  className="border rounded-md py-2 px-4 pr-10 w-full"
                  placeholder="Enter examinee ID"
                />
                {error && <div className="text-sm text-red-500">{error}</div>}
              </div>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.7759 0.092085C14.8359 0.350642 0.989393 14.112 0.62133 31.0611C0.492434 36.762 1.91386 42.391 4.73391 47.3472C4.84468 47.5409 5.0066 47.7005 5.20196 47.8084C5.39731 47.9162 5.61857 47.9683 5.84154 47.9589C6.06451 47.9495 6.28059 47.8789 6.46614 47.7549C6.6517 47.631 6.79958 47.4583 6.89362 47.2559C9.1782 42.4037 10.3594 37.1056 10.3522 31.7425C10.3468 28.4575 11.0828 25.2137 12.5054 22.2527C13.9279 19.2917 16.0004 16.6899 18.5682 14.6412C18.8201 14.4443 19.1083 14.2989 19.4163 14.2134C19.7244 14.1278 20.0463 14.1037 20.3636 14.1426C20.681 14.1814 20.9875 14.2824 21.2659 14.4397C21.5442 14.597 21.7888 14.8076 21.9858 15.0595C22.1827 15.3114 22.3281 15.5995 22.4136 15.9076C22.4992 16.2156 22.5233 16.5375 22.4844 16.8549C22.4456 17.1722 22.3446 17.4788 22.1873 17.7571C22.03 18.0355 21.8194 18.2801 21.5675 18.477C19.5824 20.0718 17.9814 22.0927 16.883 24.39C15.7846 26.6873 15.217 29.2022 15.2222 31.7486C15.2302 39.0543 13.2931 46.2303 9.60999 52.5396C9.47346 52.7715 9.41762 53.042 9.45119 53.3089C9.48477 53.5759 9.60586 53.8241 9.79554 54.0149C10.4039 54.6233 11.0397 55.2317 11.6967 55.7853C11.8314 55.8984 11.9889 55.981 12.1586 56.0274C12.3282 56.0737 12.5059 56.0827 12.6794 56.0538C12.8528 56.0249 13.018 55.9588 13.1634 55.8599C13.3088 55.761 13.4311 55.6318 13.5218 55.4811C16.2147 51.0105 18.1269 46.1142 19.1766 41.0019C19.3053 40.3694 19.6799 39.8139 20.2182 39.4577C20.7564 39.1014 21.4141 38.9736 22.0466 39.1023C22.6791 39.2309 23.2345 39.6056 23.5908 40.1438C23.947 40.6821 24.0749 41.3398 23.9462 41.9723C22.7695 47.7408 20.601 53.2615 17.537 58.2887C17.4506 58.4317 17.3946 58.5908 17.3724 58.7564C17.3501 58.9219 17.3622 59.0902 17.4079 59.2509C17.4535 59.4115 17.5318 59.5611 17.6377 59.6902C17.7437 59.8193 17.8751 59.9252 18.0237 60.0013C18.7751 60.3815 19.5447 60.7344 20.3264 61.0568C20.5964 61.1725 20.899 61.1866 21.1785 61.0966C21.4581 61.0066 21.6956 60.8185 21.8473 60.5671C27.0733 51.8867 29.8309 41.9446 29.8231 31.8125C29.8168 31.1878 30.0463 30.5837 30.4658 30.1208C30.8853 29.6579 31.4639 29.3702 32.0862 29.3151C32.4198 29.2917 32.7547 29.3373 33.0699 29.4491C33.385 29.5608 33.6738 29.7364 33.9181 29.9647C34.1625 30.1931 34.3571 30.4693 34.4899 30.7763C34.6227 31.0832 34.6908 31.4142 34.69 31.7486C34.7021 42.0937 32.0619 52.2691 27.0215 61.3032C26.9245 61.4762 26.8713 61.6703 26.8664 61.8687C26.8616 62.067 26.9053 62.2635 26.9938 62.441C27.0822 62.6185 27.2128 62.7718 27.374 62.8873C27.5353 63.0029 27.7223 63.0772 27.9189 63.104C28.8416 63.2317 29.7754 63.3189 30.7204 63.3656C30.9476 63.374 31.1726 63.3186 31.3699 63.2057C31.5672 63.0928 31.729 62.9269 31.8368 62.7268C36.8957 53.2638 39.5471 42.701 39.557 31.9707C39.5722 27.9402 36.4239 24.5212 32.3965 24.4451C31.4276 24.4265 30.4647 24.6011 29.564 24.9585C28.6632 25.3159 27.8427 25.849 27.1501 26.5269C26.4575 27.2047 25.9069 28.0136 25.5302 28.9065C25.1535 29.7993 24.9584 30.7583 24.9561 31.7273C24.9517 32.335 24.7228 32.9196 24.3135 33.3688C23.9041 33.818 23.3433 34.1 22.7386 34.1608C22.4014 34.1908 22.0615 34.1502 21.7409 34.0414C21.4203 33.9327 21.1259 33.7582 20.8765 33.5291C20.6271 33.3001 20.4283 33.0215 20.2927 32.7113C20.1572 32.401 20.0878 32.0659 20.0892 31.7273C20.0891 30.1187 20.408 28.526 21.0274 27.0413C21.6469 25.5567 22.5545 24.2097 23.698 23.0782C24.8414 21.9466 26.1978 21.0531 27.6888 20.4492C29.1798 19.8453 30.7757 19.543 32.3843 19.5599C39.0764 19.6299 44.4544 25.3911 44.4209 32.0802C44.3912 42.0019 42.2641 51.8052 38.179 60.8469C38.0862 61.0552 38.0538 61.2853 38.0854 61.5112C38.117 61.737 38.2115 61.9493 38.358 62.1241C38.5045 62.2988 38.6972 62.4288 38.914 62.4994C39.1308 62.5699 39.3631 62.5781 39.5844 62.523C40.6397 62.2728 41.6814 61.9682 42.7053 61.6104C42.8649 61.5538 43.0109 61.4645 43.134 61.3482C43.2571 61.2319 43.3545 61.0912 43.4201 60.9351C44.8367 57.5782 46.0038 54.1214 46.9122 50.5928C46.9921 50.2833 47.1322 49.9925 47.3244 49.737C47.5167 49.4816 47.7574 49.2665 48.0328 49.1041C48.3082 48.9417 48.6129 48.8351 48.9295 48.7904C49.2461 48.7458 49.5684 48.7639 49.878 48.8438C50.1876 48.9237 50.4784 49.0638 50.7338 49.2561C50.9893 49.4483 51.2043 49.689 51.3667 49.9644C51.5292 50.2398 51.6357 50.5445 51.6804 50.8611C51.7251 51.1777 51.7069 51.5 51.627 51.8096C51.3999 52.6958 51.1566 53.5779 50.897 54.456C50.8206 54.7088 50.8285 54.9796 50.9196 55.2275C51.0107 55.4754 51.18 55.687 51.4018 55.8302C51.6237 55.9734 51.8862 56.0406 52.1496 56.0215C52.413 56.0024 52.6631 55.8982 52.862 55.7245C57.795 51.4885 61.3029 45.8355 62.9083 39.5347C64.5137 33.2339 64.1386 26.5915 61.8342 20.5115C59.5297 14.4315 55.4077 9.20927 50.0293 5.55555C44.6509 1.90184 38.2773 -0.00586694 31.7759 0.092085ZM53.5495 41.7897C53.4755 42.3769 53.1901 42.917 52.7467 43.3089C52.3032 43.7009 51.7322 43.9178 51.1403 43.919C51.0387 43.919 50.9371 43.9129 50.8362 43.9008C50.519 43.8613 50.2127 43.7597 49.9347 43.6018C49.6568 43.4439 49.4127 43.2328 49.2164 42.9806C49.0201 42.7283 48.8754 42.4398 48.7906 42.1317C48.7057 41.8235 48.6825 41.5016 48.7221 41.1844C49.11 38.0561 49.3051 34.9069 49.3061 31.7547C49.2997 27.2389 47.5029 22.9099 44.3098 19.7167C41.1166 16.5235 36.7876 14.7268 32.2718 14.7203C31.56 14.72 30.8489 14.7637 30.1425 14.8511C29.5015 14.9318 28.8547 14.7546 28.3445 14.3584C27.8342 13.9622 27.5022 13.3795 27.4215 12.7386C27.3409 12.0976 27.5181 11.4508 27.9143 10.9406C28.3105 10.4303 28.8931 10.0983 29.5341 10.0176C32.6175 9.63409 35.7472 9.91009 38.7159 10.8274C41.6846 11.7447 44.4245 13.2823 46.7541 15.3383C49.0837 17.3944 50.9498 19.9221 52.2288 22.7538C53.5078 25.5855 54.1705 28.6566 54.1731 31.7638C54.1723 35.1155 53.9641 38.4638 53.5495 41.7897Z"
                  fill="#B1AFAF"
                />
              </svg>
            </div>
          }
          buttons={
            <Button
              title="Check In"
              btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5"
              btnClick={handleCheckIn}
            />
          }
          modStyles="bg-white h-fit"
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
