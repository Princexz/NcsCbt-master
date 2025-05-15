import { useNavigate } from "react-router-dom";
// import { Button } from "../../../components/shared/Button";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { materialStorage } from "../../../../config";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    setLoggedInUser,
    setIsLoggedIn,
    setUserIsAdmin,
    setAdminEmail,
    setAdminPhoneNumber,
    loggedInUserRank,
    setUsers,
    userIsAdmin,
    setMaterials,
    setQuestions,
    setSubscribers,
    setResults,
    setUserResults,
  } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [nextRank, setNextRank] = useState("");
  const [userRank, setUserRank] = useState(nextRank);
  const token = localStorage.getItem("auth-token");

  const allMaterialsRef = ref(materialStorage, "materials/");

  const setRank = () => {
    if (loggedInUserRank === "CAI") {
      setNextRank("CAII");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "CAII") {
      setNextRank("AIC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "AIC") {
      setNextRank("IC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "IC") {
      setNextRank("ASCII");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "ASCII") {
      setNextRank("ASCI");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "ASCI") {
      setNextRank("DSC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "DSC") {
      setNextRank("SC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "SC") {
      setNextRank("CSC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "CSC") {
      setNextRank("AC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "AC") {
      setNextRank("DC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "DC") {
      setNextRank("CC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    }
  };


  const handleLogin = async () => {
    if (isValid) {
      alert("Valid!")
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/admin/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = response.data.data;
        console.log(user);
        setLoggedInUser(user.email);
        setAdminEmail(user.email);
        setAdminPhoneNumber(user.phoneNumber);
        localStorage.setItem("auth-token", response.data.token);
        setIsLoading(false);
        navigate("/admin-dashboard");
        setIsLoggedIn(true);
        setUserIsAdmin(true);
        if (userIsAdmin) {
          setIsLoading(true);
          axios
            .get("https://ncs-cbt-api.onrender.com/admin/getUsers", {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            })
            .then((res) => {
              const data = res.data.data;
              setUsers(data);
            })
            .catch((err) => {});
    
          const getMaterials = async () => {
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
              setMaterials(newMaterials);
            }
          };
          getMaterials();
    
          axios
            .get("https://ncs-cbt-api.onrender.com/exam/", {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            })
            .then((res) => {
              const data = res.data.data;
              setQuestions(data);
              setIsLoading(false);
            })
            .catch((err) => {});
    
          axios
            .get("https://ncs-cbt-api.onrender.com/admin/getAllSubscribers", {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            })
            .then((res) => {
              const data = res.data.data;
              setSubscribers(data);
            })
            .catch((err) => {});
    
          axios
            .get("https://ncs-cbt-api.onrender.com/admin/getScores", {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            })
            .then((res) => {
              const data = res.data.data;
              setResults(data);
              setRank();
              const filteredUserResults = res.data.data.filter(
                (result) => result.questionCategory === userRank
              );
    
              setUserResults(filteredUserResults);
            })
            .catch((err) => {});
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        if (err.response.message === "Network Error") {
          setError("No Internet Connection");
          alert("No Internet Connection! Check your network")
        }
      }
      // setEmail("");
      // setPassword("");
    }
  };

  return (
    <div className="bg-vector min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-8 md:mx-auto bg-secondary rounded-2xl shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl text-primary font-bold">Welcome back!</h3>
          <p className="text-grey mb-8">Please enter your email and password</p>
          <div>
            <label className="block py-1 -mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid ID");
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your Email"
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
            <button
              className={`${isLoading ? "bg-grey text-secondary animate-pulse" : "bg-primary text-white"} text-lg rounded-lg shadow-sm py-4 px-4 w-full relative text-center flex justify-center items-center cursor-pointer`}
              onClick={handleLogin}
              disabled={!isValid}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
