import { Link} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";


const Navbar = () => {
    const { info, setInfo } = useContext(UserContext);
console.log(info)
    const Logout = async () => {
        try {
            const response = await fetch("http://localhost:8000/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                setInfo(null); 
              
            } else {
                // Handle error response, e.g., display an error message
                console.error("Logout failed");
                
            }
        } catch (error) {
            // Handle network errors
            console.error("Error during logout:", error);
        }
    };

   

    return (
        <div className="nav">
            <div>
                <img className="logo" src='https://icons.iconarchive.com/icons/wwalczyszyn/android-style-honeycomb/256/Books-icon.png' alt='logo' />
            </div>
            <div className="title">The Book Store</div>
            <div>
                {info ? (
                    <>
                       <Link to='/'><button onClick={Logout}>Logout</button></Link> 
                       <Link to='/addbook'><button>Add Book</button></Link> 
                    </>
                ) : (
                   <Link to='login'><button>Login</button></Link>  
                )}
            </div>
        </div>
    );
}

export default Navbar;
