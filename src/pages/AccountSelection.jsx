import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";
import Cookies from "js-cookie";
import TMDB_logo from "../assets/TMDB_logo.png";

const AccountSelection = (props) => {
  const { closePopup, isAccountSelectionOpen } = props;
  const [requestToken, setRequestToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setRequestToken(response.data.request_token);
      window.open(
        `https://www.themoviedb.org/authenticate/${response.data.request_token}`,
        "_blank"
      );
      setLoadingMessage("Waiting for approval...");
      setIsLoading(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleApprovedRequest = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  const handleVerifyData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/session/new?request_token=${requestToken}&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setIsVerifySuccess(true);
      setIsLoading(true);
      setLoadingMessage("Verified!");
      const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000);
      Cookies.set("session_id", response.data.session_id, {
        expires: expirationTime,
      });
    } catch (error) {
      setIsVerifySuccess(false);
      setIsLoading(true);
      setLoadingMessage("Failed to verify!");
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        closePopup();
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      {isAccountSelectionOpen ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-black backdrop-blur-md bg-opacity-40">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center w-48 p-4 gap-2 bg-white rounded-lg">
              <img src={TMDB_logo} alt="TMDB Logo" className="w-full h-full" />
              <p className="text-black text-center">{loadingMessage}</p>
            </div>
          ) : (
            <>
              {isLoaded ? (
                <div
                  className="flex flex-col justify-center items-center w-48 p-4 gap-2 bg-white rounded-lg hover:scale-105 transition ease-in-out duration-100 hover:cursor-pointer"
                  onClick={() => handleVerifyData()}
                >
                  <img
                    src={TMDB_logo}
                    alt="TMDB Logo"
                    className="w-full h-full"
                  />
                  <p className="text-black text-center">Verify Data</p>
                </div>
              ) : (
                <div
                  className="flex flex-col justify-center items-center w-48 p-4 gap-2 bg-white rounded-lg hover:scale-105 transition ease-in-out duration-100 hover:cursor-pointer"
                  onClick={() => handleLogin()}
                >
                  <img
                    src={TMDB_logo}
                    alt="TMDB Logo"
                    className="w-full h-full"
                  />
                  <p className="text-black text-center">Login with TMBD</p>
                </div>
              )}
            </>
          )}
          {isLoading ? (
            <>
              {isVerifySuccess == null || isVerifySuccess ? (
                <p
                  className="text-white text-xs pt-4 hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={handleApprovedRequest}
                >
                  {loadingMessage === "Waiting for approval..."
                    ? "I have approved the request"
                    : null}
                </p>
              ) : null}
            </>
          ) : (
            <>
              {isLoaded ? (
                <p
                  className="text-white text-xs pt-4 hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={() => {
                    setIsLoaded(false);
                    setIsVerifySuccess(null);
                  }}
                >
                  cancel
                </p>
              ) : (
                <p
                  className="text-white text-xs pt-4 hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={closePopup}
                >
                  close
                </p>
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

AccountSelection.propTypes = {
  closePopup: PropTypes.func,
  isAccountSelectionOpen: PropTypes.bool.isRequired,
};

export default AccountSelection;
