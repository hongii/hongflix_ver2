import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
interface PrivateRouteProps {
  element?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}

const PrivateRoute = ({
  element,
  authentication,
}: PrivateRouteProps): React.ReactElement | null => {
  let isAuthenticated = useSelector(
    (state: RootState) => state.userAuth.authenticated
  );
  if (authentication) {
    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로

    return isAuthenticated === false ? <Navigate to="/blind" /> : <Outlet />;
  } else {
    return isAuthenticated === false ? <Outlet /> : <Navigate to="/" />;
  }
};
export default PrivateRoute;
