import  "./nav.css"
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar({ handleSearch, searchTerm }){
    const navigate = useNavigate()
    
    function logout(){
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        localStorage.clear("x-api-key");
        alert("You have been logged out successfully");
        navigate("/login");
      }
    }
    return(
        <nav className="navbar">
      <Link to="/" className="navbar__logo">
        My Contacts
      </Link>
      <div className="searh-bar">
          <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
        </div>
      <div className="navbar__links">
        <Link to="/CreateContact" className="navbar__link">
          Create Contact
        </Link>
        
        <button onClick = {logout} className="navbar__logout">
          Logout
        </button>
      </div>
    </nav>
    )
}