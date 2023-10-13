import { Link } from "react-router-dom";

// import icon from '../pic/favicon.ico'
const Navbar=()=>{
    return(
        <div className="nav">
            <div><img className="logo" src='https://icons.iconarchive.com/icons/wwalczyszyn/android-style-honeycomb/256/Books-icon.png' alt='logo'/></div>
            <div>The Book Store</div>
            <div><Link to='/login'><button>Login</button></Link></div>
        </div>
    )
}
export default Navbar;