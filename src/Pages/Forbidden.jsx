import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="py-15 flex items-center justify-center px-5">
      <div className="max-w-md text-center p-10 ">
        <div className="text-red-500 text-5xl mb-4 flex justify-center">
          <FaLock />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">403 - Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
          <br /> This area is restricted to administrators only.
        </p>

        <Link
          to="/"
          className="btn btn-outline btn-error btn-wide mx-auto"
        >
          🔙 Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
