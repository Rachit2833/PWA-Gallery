import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelperContext } from "./Context/Helper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayot from "./AppLayout";


import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Rewind from "./Pages/Rewind";
import AlbumPage from "./Pages/AlbumPage";
import FavouriteLayout from "./favourite/FavouriteLayout";
import Password from "./PrivateVault/Password";
import Login from "./Authentication/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Privatepage from "./PrivateVault/Privatepage";
import Camera from "./Pages/Camera";
import Share from "./Pages/Share";



function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
       
          <BrowserRouter>
            <Routes>
            <Route element={<ProtectedRoute> <HelperContext><AppLayot /></HelperContext></ProtectedRoute>}>
                <Route path="/" element={<Home />} />
                <Route path="/rewind" element={<Rewind />} />
                <Route path="/album" element={<AlbumPage />} />
                <Route path="/favourite" element={<FavouriteLayout />} />
                <Route path="/private" element={<Password />} />
                <Route path="/Vault" element={<Privatepage />} />
                <Route path="/Camera" element={<Camera />} />

              </Route>
              <Route path="/login" element={<Login />} />

            </Routes>
          </BrowserRouter>
 
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
