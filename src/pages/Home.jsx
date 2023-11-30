import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Card from "../component/Card";
import AccountSelection from "./AccountSelection";
import Cookies from "js-cookie";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [userData, setUserData] = useState({});
  const [favorite, setFavorite] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountSelectionOpen, setIsAccountSelectionOpen] = useState(false);
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

    const getNowPlaying = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&page=1`
        );
        setNowPlaying(response.data.results);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getTopRated = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&page=1`
        );
        setTopRated(response.data.results);
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
    getNowPlaying();
    getTopRated();
    getFavorite();
    getWatchlist();
  }, [isLoggedIn, userData.id, updateFlag]);

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

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchedMovie(response.data.results);
    } catch (error) {
      toast.error(error.message);
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
      <div className="px-12 sm:px-24 pt-12">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search here..."
          className="w-full h-12 px-4 rounded-md"
        />
      </div>
      {searchedMovie && searchedMovie.length > 0 ? (
        <div className="px-12 sm:px-24 py-12">
          <p className="text-3xl font-semibold pb-8">Searched Movie</p>
          <div className="flex gap-8 sm:gap-[1.64rem] w-full flex-wrap justify-center sm:justify-start">
            {searchedMovie && searchedMovie.length > 0
              ? searchedMovie.map((movie) => (
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
                    isWatchlisted={watchlist.some(
                      (item) => item.id === movie.id
                    )}
                    isFavorited={favorite.some((item) => item.id === movie.id)}
                  />
                ))
              : null}
          </div>
        </div>
      ) : (
        <div className="px-12 sm:px-24 py-12 sm:pb-24">
          <p className="text-3xl font-semibold pb-8">Now Playing</p>
          <div className="flex gap-8 w-full pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray">
            {nowPlaying.map((movie) => (
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
          <p className="text-3xl font-semibold py-8">Top Rated</p>
          <div className="flex gap-8 sm:gap-[1.64rem] w-full flex-wrap justify-center sm:justify-start">
            {topRated.map((movie) => (
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
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
