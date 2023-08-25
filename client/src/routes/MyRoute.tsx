import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginMainPage from "../pages/LoginMainPage";
import LoginInputPage from "../pages/LoginInputPage";
import SignUpPage from "../pages/SignUpPage";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import PlayMoviePage from "../pages/PlayMoviePage";
import NotFoundPage from "../pages/NotFoundPage";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

const MyRoute = () => {
  return (
    <Routes>
      {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
      <Route element={<PrivateRoute authentication={false} />}>
        <Route path="/blind" element={<LoginMainPage />} />
        <Route path="/login" element={<LoginInputPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
      <Route element={<PrivateRoute authentication={true} />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playmovie/:movieId" element={<PlayMoviePage />} />
        </Route>
      </Route>

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default MyRoute;
