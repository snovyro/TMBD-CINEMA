import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../component/Navbar";
import Card from "../component/Card";
import AccountSelection from "./AccountSelection";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [movieRecommendation, setmovieRecommendation] = useState([]);
  const [userData, setUserData] = useState({});
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isAccountSelectionOpen, setIsAccountSelectionOpen] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  const movieId = useLocation().pathname.split("/")[2];
  const hours = Math.floor(movieDetail.runtime / 60);
  const minutes = movieDetail.runtime % 60;
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionId = async () => {
      Cookies.get("session_id") && setIsLoggedIn(true);
    };

    const getUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${
              import.meta.env.VITE_API_KEY
            }&session_id=${Cookies.get("session_id")}`
          );
          setUserData(response.data);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    const getMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
        setMovieDetail(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getmovieRecommendation = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setmovieRecommendation(response.data.results);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getFavorite = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/account/${
              userData.id
            }/favorite/movies?api_key=${
              import.meta.env.VITE_API_KEY
            }&session_id=${Cookies.get(
              "session_id"
            )}&language=en-US&sort_by=created_at.asc&page=1`
          );
          setFavorite(response.data.results);
          const isFavorited = response.data.results.some(
            (item) => item.id === parseInt(movieId)
          );
          setIsFavorited(isFavorited);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    const getWatchlist = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/account/${
              userData.id
            }/watchlist/movies?api_key=${
              import.meta.env.VITE_API_KEY
            }&session_id=${Cookies.get(
              "session_id"
            )}&language=en-US&sort_by=created_at.asc&page=1`
          );
          setWatchlist(response.data.results);
          const isWatchlisted = response.data.results.some(
            (item) => item.id === parseInt(movieId)
          );

          setIsWatchlisted(isWatchlisted);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    getSessionId();
    getMovieDetail();
    getmovieRecommendation();
    getUserData();
    getFavorite();
    getWatchlist();
  }, [movieId, userData.id, updateFlag, isLoggedIn]);

  const handleRoundUp = (number) => {
    if (typeof number === "number") {
      return Number(number.toFixed(1));
    } else {
      return 0;
    }
  };

  const limitChar = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    } else {
      return text;
    }
  };

  const handleRedirectDetail = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleOpenPopup = () => {
    setIsAccountSelectionOpen(true);
  };

  const handleClosePopup = () => {
    setIsAccountSelectionOpen(false);
  };

  const addToFavorite = async (id) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${userData.id}/favorite?api_key=${
          import.meta.env.VITE_API_KEY
        }&session_id=${Cookies.get("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
          favorite: true,
        }
      );
      toast.success(response.data.status_message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateFlag(!updateFlag);
    }
  };

  const addToWatchlist = async (id) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${
          userData.id
        }/watchlist?api_key=${
          import.meta.env.VITE_API_KEY
        }&session_id=${Cookies.get("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
          watchlist: true,
        }
      );
      toast.success(response.data.status_message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateFlag(!updateFlag);
    }
  };

  const removeFromFavorite = async (id) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${userData.id}/favorite?api_key=${
          import.meta.env.VITE_API_KEY
        }&session_id=${Cookies.get("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
          favorite: false,
        }
      );
      toast.success(response.data.status_message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateFlag(!updateFlag);
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${
          userData.id
        }/watchlist?api_key=${
          import.meta.env.VITE_API_KEY
        }&session_id=${Cookies.get("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
          watchlist: false,
        }
      );
      toast.success(response.data.status_message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateFlag(!updateFlag);
    }
  };

  const logoutSession = async () => {
    try {
      await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          data: {
            session_id: Cookies.get("session_id"),
          },
        }
      );
      Cookies.remove("session_id");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateFlag(!updateFlag);
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <Navbar
        isLoggedIn={isLoggedIn}
        openLogin={handleOpenPopup}
        logoutSession={logoutSession}
      />
      <AccountSelection
        closePopup={handleClosePopup}
        isAccountSelectionOpen={isAccountSelectionOpen}
      />
      {movieDetail && movieDetail.backdrop_path && (
        <div className="w-screen h-[400px] bg-black">
          <img
            className="w-full h-full opacity-40 object-cover"
            src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
            alt={movieDetail.title}
          />
          <div className="absolute inset-0 flex items-center justify-center sm:justify-left mb-[15.5rem] sm:px-24 sm:mb-[21.5rem]">
            <div className="h-[300px] w-fit flex">
              <img
                className="w-[200px] h-[300px] object-cover"
                src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
                alt={movieDetail.title}
              />
              <div className="px-5 py-6 flex-col gap-3 hidden sm:flex">
                <p className="text-3xl font-bold">
                  {movieDetail.title}{" "}
                  <span className="font-normal">
                    (
                    {movieDetail.release_date &&
                      movieDetail.release_date.split("-")[0]}
                    )
                  </span>
                </p>
                <div>
                  <span>{movieDetail.release_date} - </span>
                  {movieDetail.genres && (
                    <span>
                      {movieDetail.genres.map((genre) => genre.name).join(", ")}{" "}
                      -{" "}
                    </span>
                  )}
                  <span>
                    {hours}h {minutes}m
                  </span>
                </div>
                <div className="flex gap-4 justify-start items-center">
                  {handleRoundUp(movieDetail.vote_average) >= 6 ? (
                    <div className="bg-blue-500 rounded-full h-8 w-8 text-xs font-bold justify-center items-center flex">
                      <div className="bg-white rounded-full h-6 w-6 text-xs font-bold justify-center items-center flex">
                        <p className="text-blue-500">
                          {handleRoundUp(movieDetail.vote_average)}
                        </p>
                      </div>
                    </div>
                  ) : handleRoundUp(movieDetail.vote_average) >= 4 &&
                    handleRoundUp(movieDetail.vote_average) <= 5.9 ? (
                    <div className="bg-yellow-500 rounded-full h-8 w-8 text-xs font-bold justify-center items-center flex">
                      <div className="bg-white rounded-full h-6 w-6 text-xs font-bold justify-center items-center flex">
                        <p className="text-yellow-500">
                          {handleRoundUp(movieDetail.vote_average)}{" "}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-500 rounded-full h-8 w-8 text-xs font-bold justify-center items-center flex">
                      <div className="bg-white rounded-full h-6 w-6 text-xs font-bold justify-center items-center flex">
                        <p className="text-red-500">
                          {handleRoundUp(movieDetail.vote_average)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="text-xs -ml-2">
                    <p>User</p>
                    <p>Score</p>
                  </div>
                  {isLoggedIn && (
                    <div className="flex gap-4 transition-opacity duration-300 ease-in-out">
                      {isWatchlisted ? (
                        <svg
                          className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                          onClick={() => removeFromWatchlist(movieId)}
                          width="16"
                          height="21"
                          viewBox="0 0 16 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H13C13.7956 0 14.5587 0.316071 15.1213 0.87868C15.6839 1.44129 16 2.20435 16 3V19.028C16 20.248 14.62 20.958 13.628 20.249L8 16.229L2.372 20.249C1.379 20.959 0 20.249 0 19.029V3Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                          onClick={() => addToWatchlist(movieId)}
                          width="16"
                          height="21"
                          viewBox="0 0 16 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H13C13.7956 0 14.5587 0.316071 15.1213 0.87868C15.6839 1.44129 16 2.20435 16 3V19.028C16 20.248 14.62 20.958 13.628 20.249L8 16.229L2.372 20.249C1.379 20.959 0 20.249 0 19.029V3ZM3 2C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V18.057L7.128 14.394C7.38243 14.2122 7.68731 14.1145 8 14.1145C8.31269 14.1145 8.61757 14.2122 8.872 14.394L14 18.057V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H3Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      {isFavorited ? (
                        <svg
                          className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                          onClick={() => removeFromFavorite(movieId)}
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.13 7.66666 0.000666667 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.8707 7.66666 19.612 8.39999C19.3533 9.13333 18.8993 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                          onClick={() => addToFavorite(movieId)}
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.13 7.66666 0.000666667 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.8707 7.66666 19.612 8.39999C19.3533 9.13333 18.8993 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19ZM10 16.3C11.6 14.8667 12.9167 13.6373 13.95 12.612C14.9833 11.5867 15.8 10.6953 16.4 9.93799C17 9.17933 17.4167 8.50399 17.65 7.91199C17.8833 7.31999 18 6.73266 18 6.14999C18 5.14999 17.6667 4.31666 17 3.64999C16.3333 2.98333 15.5 2.64999 14.5 2.64999C13.7167 2.64999 12.9917 2.87066 12.325 3.31199C11.6583 3.75333 11.2 4.31599 10.95 4.99999H9.05C8.8 4.31666 8.34167 3.75399 7.675 3.31199C7.00833 2.86999 6.28333 2.64933 5.5 2.64999C4.5 2.64999 3.66667 2.98333 3 3.64999C2.33333 4.31666 2 5.14999 2 6.14999C2 6.73333 2.11667 7.32099 2.35 7.91299C2.58333 8.50499 3 9.17999 3.6 9.93799C4.2 10.696 5.01667 11.5877 6.05 12.613C7.08333 13.6383 8.4 14.8673 10 16.3Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-justify italic">{movieDetail.tagline}</p>
                <div>
                  <p className="font-bold">Overview</p>
                  <p className="text-justify">{movieDetail.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-5 pt-6 flex-col gap-3 flex sm:hidden">
        <p className="text-3xl font-bold">
          {movieDetail.title}{" "}
          <span className="font-normal">
            (
            {movieDetail.release_date && movieDetail.release_date.split("-")[0]}
            )
          </span>
        </p>
        <div>
          <span>{movieDetail.release_date} - </span>
          {movieDetail.genres && (
            <span>
              {movieDetail.genres.map((genre) => genre.name).join(", ")} -{" "}
            </span>
          )}
          <span>
            {hours}h {minutes}m
          </span>
        </div>
        <div className="flex gap-4 justify-start items-center">
          {handleRoundUp(movieDetail.vote_average) >= 6 ? (
            <div className="bg-blue-500 rounded-full h-8 w-8 text-xs font-bold justify-center items-center flex">
              <div className="bg-white rounded-full h-6 w-6 text-xs font-bold justify-center items-center flex">
                <p className="text-blue-500">
                  {handleRoundUp(movieDetail.vote_average)}
                </p>
              </div>
            </div>
          ) : handleRoundUp(movieDetail.vote_average) >= 4 &&
            handleRoundUp(movieDetail.vote_average) <= 5.9 ? (
            <div className="bg-yellow-500 rounded-full h-8 w-8 text-xs font-bold justify-center items-center flex">
              <div className="bg-white rounded-full h-6 w-6 text-xs font-bold justify-center items-center flex">
                <p className="text-yellow-500">
                  {handleRoundUp(movieDetail.vote_average)}{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-red-500 rounded-full h-8 w-8 text-xs font-bold justify-center items-center flex">
              <div className="bg-white rounded-full h-6 w-6 text-xs font-bold justify-center items-center flex">
                <p className="text-red-500">
                  {handleRoundUp(movieDetail.vote_average)}
                </p>
              </div>
            </div>
          )}
          <div className="text-xs -ml-2">
            <p>User</p>
            <p>Score</p>
          </div>
          {isLoggedIn && (
            <div className="flex gap-4 transition-opacity duration-300 ease-in-out">
              {isWatchlisted ? (
                <svg
                  className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={() => removeFromWatchlist(movieId)}
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H13C13.7956 0 14.5587 0.316071 15.1213 0.87868C15.6839 1.44129 16 2.20435 16 3V19.028C16 20.248 14.62 20.958 13.628 20.249L8 16.229L2.372 20.249C1.379 20.959 0 20.249 0 19.029V3Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={() => addToWatchlist(movieId)}
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H13C13.7956 0 14.5587 0.316071 15.1213 0.87868C15.6839 1.44129 16 2.20435 16 3V19.028C16 20.248 14.62 20.958 13.628 20.249L8 16.229L2.372 20.249C1.379 20.959 0 20.249 0 19.029V3ZM3 2C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V18.057L7.128 14.394C7.38243 14.2122 7.68731 14.1145 8 14.1145C8.31269 14.1145 8.61757 14.2122 8.872 14.394L14 18.057V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H3Z"
                    fill="white"
                  />
                </svg>
              )}
              {isFavorited ? (
                <svg
                  className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={() => removeFromFavorite(movieId)}
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.13 7.66666 0.000666667 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.8707 7.66666 19.612 8.39999C19.3533 9.13333 18.8993 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={() => addToFavorite(movieId)}
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.13 7.66666 0.000666667 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.8707 7.66666 19.612 8.39999C19.3533 9.13333 18.8993 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19ZM10 16.3C11.6 14.8667 12.9167 13.6373 13.95 12.612C14.9833 11.5867 15.8 10.6953 16.4 9.93799C17 9.17933 17.4167 8.50399 17.65 7.91199C17.8833 7.31999 18 6.73266 18 6.14999C18 5.14999 17.6667 4.31666 17 3.64999C16.3333 2.98333 15.5 2.64999 14.5 2.64999C13.7167 2.64999 12.9917 2.87066 12.325 3.31199C11.6583 3.75333 11.2 4.31599 10.95 4.99999H9.05C8.8 4.31666 8.34167 3.75399 7.675 3.31199C7.00833 2.86999 6.28333 2.64933 5.5 2.64999C4.5 2.64999 3.66667 2.98333 3 3.64999C2.33333 4.31666 2 5.14999 2 6.14999C2 6.73333 2.11667 7.32099 2.35 7.91299C2.58333 8.50499 3 9.17999 3.6 9.93799C4.2 10.696 5.01667 11.5877 6.05 12.613C7.08333 13.6383 8.4 14.8673 10 16.3Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
        <p className="text-justify italic">{movieDetail.tagline}</p>
        <div>
          <p className="font-bold">Overview</p>
          <p className="text-justify">{movieDetail.overview}</p>
        </div>
      </div>
      {movieRecommendation && movieRecommendation.length > 0 ? (
        <div className="px-12 sm:px-24 sm:py-12">
          <p className="text-3xl font-semibold pb-8">Recommendations</p>
          <div className="flex gap-8 sm:gap-[1.64rem] w-full flex-wrap justify-center sm:justify-start">
            {movieRecommendation.map((movie) => (
              <Card
                key={movie.id}
                name={limitChar(movie.title, 15)}
                year={movie.release_date}
                image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                redirectDetail={() => handleRedirectDetail(movie.id)}
                isLoggedIn={isLoggedIn}
                addToFavorite={() => addToFavorite(movie.id)}
                addToWatchlist={() => addToWatchlist(movie.id)}
                removeFromFavorite={() => removeFromFavorite(movie.id)}
                removeFromWatchlist={() => removeFromWatchlist(movie.id)}
                isWatchlisted={watchlist.some((item) => item.id === movie.id)}
                isFavorited={favorite.some((item) => item.id === movie.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full text-center py-48">
          <p>Movie Recommendation Not Available</p>
          <p className="text-xs pt-1">(find another movie)</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MovieDetail;
