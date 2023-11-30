import PropTypes from "prop-types";

const Card = (props) => {
  const {
    name,
    year,
    image,
    isWatchlisted,
    isFavorited,
    isLoggedIn,
    addToWatchlist,
    addToFavorite,
    removeFromWatchlist,
    removeFromFavorite,
    redirectDetail,
  } = props;

  return (
    <div className="w-full sm:w-48 min-w-fit h-[356px] bg-secondary group hover:opacity-100 relative">
      {isLoggedIn ? (
        <div>
          <div className="w-full sm:w-48 h-[280px]">
            <img
              className="w-full sm:w-48 h-full object-cover"
              src={image}
              alt={name}
            />
            <div className="flex gap-4 absolute -mt-[1.75rem] ml-[7.75rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              {isWatchlisted ? (
                <svg
                  className="hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out"
                  onClick={removeFromWatchlist}
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
                  onClick={addToWatchlist}
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
                  onClick={removeFromFavorite}
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
                  onClick={addToFavorite}
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
          </div>
          <div className="text-gray p-3.5 gap-1 flex flex-col">
            <p
              className="font-bold hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out w-fit"
              onClick={redirectDetail}
            >
              {name}
            </p>
            <p className="text-sm">{year}</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-48 h-[280px]">
            <img className="w-48 h-full object-cover" src={image} alt={name} />
          </div>
          <div className="text-gray p-3.5 gap-1 flex flex-col">
            <p
              className="font-bold hover:cursor-pointer hover:opacity-50 transition duration-100 ease-in-out w-fit"
              onClick={redirectDetail}
            >
              {name}
            </p>
            <p className="text-sm">{year}</p>
          </div>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isWatchlisted: PropTypes.bool,
  isFavorited: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  addToWatchlist: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromWatchlist: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
  redirectDetail: PropTypes.func.isRequired,
};

export default Card;
