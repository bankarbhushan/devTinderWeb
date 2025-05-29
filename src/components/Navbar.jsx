import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  // just getting the data from the store

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log("Logout Error :", err.message);
    }
  };

  return (
    <div className="navbar px-6 bg-base-300 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          🧑‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
            Welcome, <span className="font-semibold">{user.firstName}</span>
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User Profile"
                  src={user.photoUrl}
                  className="object-cover"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <Link to="/request">Requests</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/subscriptions">Subscriptions</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
