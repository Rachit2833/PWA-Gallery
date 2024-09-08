import { useMutation, useQueryClient } from "react-query"
import "./Navbar.css"
import toast from "react-hot-toast"
import { Logout } from "../Sevices/Logout"
import { useNavigate } from "react-router-dom"
function Navbar() {
    const queryClient =useQueryClient()
    const navigate =useNavigate()
    window.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault()
        deferredPrompt = event
        return false
    })
    const { mutate: LogoutMutate, isLoading } = useMutation({
        mutationFn: async () => {
            try {
                await Logout();  // Invoke the Logout function
            } catch (error) {
                // Handle any errors if necessary
                console.error("Logout error:", error);
            }
        },
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login', { replace: true });
            toast.success("Logout Successful");
        },
    }); 
    return (
        <>

            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />
            <nav className="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="https://t4.ftcdn.net/jpg/04/06/91/91/240_F_406919147_D3WsGjwXj1qmFNrei2ZFvBWwiueRcFmg.jpg" alt="logo" />
                        </span>
                        <div className="text header-text">
                            <span className="main">Sidebar</span>
                            <span className="sub">Component</span>
                        </div>
                    </div>

                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">

                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-home-alt icons"></i>
                                    <span className="  text nav-text"onClick={()=>{
                                        navigate("/")
                                    }} >Home</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-bar-chart-alt-2 icons"></i>
                                    <span className="text nav-text" onClick={() => {
                                        navigate("/rewind")
                                    }}>Rewind</span>
                                </a>
                            </li>

                          
                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-heart icons"></i>
                                    <span className="text nav-text" onClick={() => {
                                        navigate("/favourite")
                                    }}>Favourites</span>

                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-pie-chart-alt icons"></i>
                                    <span className="text nav-text" onClick={()=>{
                                        navigate("/private")
                                    }}>Private</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-wallet-alt icons"></i>
                                    <span className="text nav-text" onClick={()=>{navigate("/camera")}}>Post</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-log-out icons"></i>
                                <span className="text nav-text" onClick={LogoutMutate}>Log Out</span>
                            </a>
                        </li>

                    </div>
                </div>
            </nav>
            <script>

            </script>
        </>
    )
}

export default Navbar
