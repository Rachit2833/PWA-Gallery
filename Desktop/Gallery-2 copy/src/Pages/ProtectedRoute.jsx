import { useQuery } from "react-query"
import { getSession } from "../Sevices/Login"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const {data:session,isLoading} =useQuery({
        queryFn:getSession,
        queryKey:["Session"]
    })
  
  var isAuthenticated=session?.role ==="authenticated"
    if (!isAuthenticated) {
        navigate("/login")
    }
    if(isAuthenticated){
        return children
    }
}

export default ProtectedRoute
