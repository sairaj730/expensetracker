import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FiHome, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";

function Sidebar({ user, handleLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <Link to="/">ET</Link>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/">
                <FiHome />
                <span>Home</span>
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to="/credentials/Login">
                    <FiLogIn />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/credentials/Signup">
                    <FiUserPlus />
                    <span>Signup</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {user && (
        <div className="sidebar-bottom">
          <button onClick={handleLogout} className="sidebar-logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;