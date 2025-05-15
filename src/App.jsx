import { useEffect, useState } from "react";
import { MyRoutes } from "./router/MyRoutes";
import { useUserStore } from "./store/userStore";
import axios from "axios";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { imageStorage, materialStorage } from "../config";
import { doc, getDoc } from "firebase/firestore";
import { Modal } from "./components/shared/Modal";
import { Button } from "./components/shared/Button";
import { set } from "firebase/database";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0">
      {isLoading && (
        <div className="bg-cardgreen absolute inset-0 flex items-center justify-center mx-auto space-x-2 md:space-x-4">
          <div
            className="circle animate-bounce bg-primary"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="circle animate-bounce bg-yellow"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="circle animate-bounce bg-secondary"
            style={{ animationDelay: "-0.2s" }}
          ></div>
        </div>
      )}
      {!isLoading && <MyRoutes />}
    </div>
  );
};

export default App;
