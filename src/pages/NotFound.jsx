import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center gap-4">
      <p className="text-6xl">NotFound</p>
      <p
        className="text-xs hover:cursor-pointer hover:opacity-50 transition ease-in-out duration-100"
        onClick={() => handleReturn()}
      >
        return to homepage
      </p>
    </div>
  );
};

export default NotFound;
