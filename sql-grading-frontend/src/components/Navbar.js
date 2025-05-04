import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userName = decoded?.name;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  

  return (
    <nav style={{ padding: "10px", background: "#eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>SQL Automatikus lekérdezés-kiértékelő rendszer</h2>
      <div>
        {token ? (
          <>
            <Link to="/practice" style={{ marginRight: "15px" }}>Gyakorlás</Link>  {/*  Gyakorlás link */}
            <span style={{ marginRight: "15px" }}>👤 {userName}</span>
            <button onClick={handleLogout}>Kilépés</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>Bejelentkezés</Link>
            <Link to="/register">Regisztráció</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
