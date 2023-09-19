import axios from "../api/axiosBackend";
import { userActions } from "../slices/userSlice";
import { userAuthActions } from "../slices/userAuthSlice";

export const checkAccessToken = async (dispatch: any) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/checkAcessToken`
    );
  } catch (error: any) {
    if (error.response.status === 401) {
      try {
        const resRefresh = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/refreshToken`
        );
        if (resRefresh.status === 201) {
          console.log(resRefresh.data.success);
          dispatch(userActions.refreshAccessTk(resRefresh.data));
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          window.alert("문제가 발생했습니다. 로그인을 다시 진행해주세요.");
        } else if (error.response.status === 404) {
          window.alert(
            "로그인 인증 기간이 만료되었습니다. 로그인을 다시 진행해주세요."
          );
        }

        await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/logout`
        );
        dispatch(userAuthActions.logout());
        dispatch(userActions.logout());
      }
    } else {
      window.alert(
        "로그인 인증 기간이 만료되었습니다. 로그인을 다시 진행해주세요."
      );
      await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/logout`
      );
      dispatch(userAuthActions.logout());
      dispatch(userActions.logout());
    }
  }
};
