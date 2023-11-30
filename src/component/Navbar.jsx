import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const { openLogin, isLoggedIn, logoutSession } = props;
  const navigate = useNavigate();

  return (
    <div className="w-screen max-w-full h-32 sm:h-24 bg-nav-blue sticky left-0 top-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center px-8 sm:px-24 z-50">
      <p
        className="text-3xl font-extrabold tracking-widest hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out mb-4 sm:mb-0"
        onClick={() => navigate("/")}
      >
        CINEMA
      </p>
      {isLoggedIn ? (
        <div className="flex flex-row gap-8 text-lg">
          <p
            className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
            onClick={() => navigate("/favorites")}
          >
            Favorite
          </p>
          <p
            className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
            onClick={() => navigate("/watchlist")}
          >
            Watchlist
          </p>
          <p
            className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out block sm:hidden"
            onClick={logoutSession}
          >
            Logout
          </p>
          <svg
            className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out hidden sm:block"
            onClick={logoutSession}
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.75 26.5833C22.7114 26.5833 23.6334 26.2014 24.3133 25.5216C24.9931 24.8418 25.375 23.9197 25.375 22.9583L25.375 6.04165C25.375 5.08024 24.9931 4.1582 24.3133 3.47839C23.6334 2.79857 22.7114 2.41665 21.75 2.41665L14.5 2.41665C13.5386 2.41665 12.6166 2.79857 11.9367 3.47838C11.2569 4.1582 10.875 5.08024 10.875 6.04165L10.875 22.9583C10.875 23.9197 11.2569 24.8418 11.9367 25.5216C12.6166 26.2014 13.5386 26.5833 14.5 26.5833L21.75 26.5833ZM9.31263 20.1876C9.08603 20.4141 8.77874 20.5414 8.45833 20.5414C8.13793 20.5414 7.83064 20.4141 7.60404 20.1876L2.77071 15.3543C2.54418 15.1277 2.41692 14.8204 2.41692 14.5C2.41692 14.1796 2.54418 13.8723 2.77071 13.6457L7.60404 8.81235C7.83194 8.59225 8.13716 8.47045 8.45398 8.47321C8.77081 8.47596 9.07387 8.60304 9.29791 8.82707C9.52194 9.05111 9.64902 9.35417 9.65177 9.67099C9.65453 9.98782 9.53273 10.293 9.31263 10.5209L6.54192 13.2916L16.9167 13.2916C17.2371 13.2916 17.5445 13.419 17.7711 13.6456C17.9977 13.8722 18.125 14.1795 18.125 14.5C18.125 14.8205 17.9977 15.1278 17.7711 15.3544C17.5445 15.581 17.2371 15.7083 16.9167 15.7083L6.54192 15.7083L9.31263 18.479C9.53915 18.7056 9.66641 19.0129 9.66641 19.3333C9.66641 19.6537 9.53915 19.961 9.31263 20.1876Z"
              fill="white"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-row gap-8 text-lg">
          <p
            className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
            onClick={openLogin}
          >
            Favorite
          </p>
          <p
            className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
            onClick={openLogin}
          >
            Watchlist
          </p>
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  openLogin: PropTypes.func,
  logoutSession: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
