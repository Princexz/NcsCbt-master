import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/shared/Button";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { materialStorage } from "../../../../config";

export const Login = () => {
  const navigate = useNavigate();
  const {
    setLoggedInUser,
    setIsLoggedIn,
    setExamQuestions,
    setUserIsSubscribed,
    examQuestions,
    loggedInUser,
    userImage,
    setUserIsUser,
    userIsUser,
    setUserMaterials,
    setUserImage,
    loggedInUserId,
    setLoggedInUserId,
    setLoggedInUserEmail,
    setLoggedInUserPhoneNumber,
    setLoggedInUserRank,
  } = useUserStore();

  const imageRef = ref(materialStorage, "images/");

  const [examineeId, setExamineeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("auth-token");
  const allMaterialsRef = ref(materialStorage, "materials/");

  const handleLogin = async () => {
    if (isValid) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/users/login",
          { examineeId, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = response.data.data;
        setLoggedInUser(user.fullName);
        localStorage.setItem("auth-token", response.data.token);
        setIsLoading(false);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        const userData = {
          userEmail: user.email,
          userId: user.examineeId,
          userPhone: user.phoneNumber,
          userrank: user.rank,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserIsUser(true);
        setLoggedInUserEmail(user.email);
        setLoggedInUserId(user.examineeId);
        setLoggedInUserPhoneNumber(user.phoneNumber);
        setLoggedInUserRank(user.rank);
        navigate("/dashboard/overview");
        setIsLoading(false);
        setExamineeId("");
        setPassword("");
        if (userIsUser) {
          setIsLoading(true);
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 10000); // 10000 milliseconds = 10 seconds

          // Clear the timer when the component unmounts
          const getMaterials = async () => {
            setIsLoading(true);
            const res = await listAll(allMaterialsRef);
            let newMaterials = [];
            for (const item of res.items) {
              const url = await getDownloadURL(item);
              const metadata = await getMetadata(item);
              const coverImageUrl = metadata.customMetadata.materialCover;
              newMaterials.push({
                url: url,
                materialDetails: metadata,
                coverImage: coverImageUrl,
              });
              setUserMaterials(newMaterials);
              setIsLoading(false);
            }
          };
          getMaterials();

          const fetchUserImage = async () => {
            setUserImage("");
            // List all files in Firebase Storage
            const res = await listAll(imageRef);
            res.items.forEach((item) => {
              // Get metadata for each file
              getMetadata(item).then((metadata) => {
                // Check if the userId in the metadata matches the current user's ID
                if (metadata.customMetadata) {
                  // alert();
                  if (metadata.customMetadata.userId === loggedInUserId) {
                    getDownloadURL(item)
                      .then((url) => {
                        setUserImage(url);
                      })
                      .catch((error) => {
                        if (error) {
                          setUserImage("");
                          console.error("Error getting image URL: ", error);
                        }
                      });
                  }
                }
              });
            });
          };

          fetchUserImage();

          axios
            .get("https://ncs-cbt-api.onrender.com/exam/getExamQuestions", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setUserIsSubscribed(true);
              setExamQuestions(res.data.data);
            })
            .catch((err) => {
              if (err.response.status === 401) {
                setUserIsSubscribed(false);
              }
            });
        }
      } catch (err) {
        setIsLoading(false);
        if (!err?.response) {
          console.log(err);
        }
        if (err.response) {
          setError(err.response.data.message);
        }
        if (err.response.message === "Network Error") {
          setError("No Internet Connection");
          alert("No Internet Connection! Check your network")
        }
      }
    }
  };

  return (
    <div className="bg-vector min-h-screen flex flex-col gap-2 items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-8 md:mx-auto bg-secondary rounded-2xl shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl text-primary font-bold">Welcome back!</h3>
          <p className="text-grey mb-8">Please enter your ID and password</p>
          <div>
            <label className="block py-1 -mb-1">Examinee ID</label>
            <input
              type="text"
              value={examineeId}
              onChange={(e) => {
                setExamineeId(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid ID");
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your ID"
            />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
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
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Password"
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-col gap-3 pt-3 items-center">
            <Button
              title={isLoading ? "Logging in..." : "Log In"}
              btnStyles={`${isLoading ? "bg-grey text-secondary animate-pulse" : "bg-primary text-white"} text-lg rounded-lg shadow-sm py-4 px-4 w-full relative text-center flex justify-center items-center`}
              btnClick={handleLogin}
              disabled={isValid === false || isLoading === true}
            />

            <Button
              title="Create Account"
              btnStyles="border border-primary text-primary text-lg rounded-lg shadow-sm py-4 px-4 w-full"
              btnClick={() => navigate("/create-account")}
            />
          </div>
        </div>
      </div>
      <Link to="/forgot-password" className="text-sm dark:text-secondary text-primary">
        Forgot Password?
      </Link>
    </div>
  );
};
