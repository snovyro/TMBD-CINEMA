import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../component/Navbar";
import Card from "../component/Card";

const Favorite = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({});
  const [updateFlag, setUpdateFlag] = useState(false);
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
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    getUserData();
    getSessionId();
    getFavorite();
    getWatchlist();
  }, [isLoggedIn, userData.id, updateFlag]);

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
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      navigate("/");
    }
  };

  const handleRedirectDetail = (id) => {
    navigate(`/movie/${id}`);
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

  const limitChar = (text, limit) => {
    if (text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="w-screen min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} logoutSession={logoutSession} />
      <div className="px-12 sm:px-24 py-12">
        <p className="text-3xl font-semibold py-8">Watchlist</p>
        <div className="flex gap-8 sm:gap-[1.64rem] w-full flex-wrap justify-center sm:justify-start">
          {favorite.map((movie) => (
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
      <ToastContainer />
    </div>
  );
};

export default Favorite;
