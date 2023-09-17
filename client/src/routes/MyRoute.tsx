import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const LoginInputPage = lazy(() => import("../pages/LoginInputPage"));
const LoginMainPage = lazy(() => import("../pages/LoginMainPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const PlayMoviePage = lazy(() => import("../pages/PlayMoviePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

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
    <Suspense fallback={null}>
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
    </Suspense>
  );
};
export default MyRoute;
