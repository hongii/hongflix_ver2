import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../hooks/useOnClickOutside";
import * as S from "../styles/NavStyle";
import axios from "../api/axiosBackend";

import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import { userAuthActions } from "../slices/userAuthSlice";

const Nav = () => {
  const [navBlackShow, setShow] = useState<boolean>(false); //nav바의 배경색을 black으로(#111) 보이게 할지 말지 상태를 저장하는 state변수
  const [searchValue, setSearchValue] = useState<string>("");
  const [isClickSearch, setClickSearch] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useOnClickOutside(ref, setClickSearch);

  const onClickLogo = () => {
    setClickSearch(false);
    setSearchValue("");
    navigate("/");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const clickHandler = () => {
    setClickSearch(!isClickSearch);
    searchRef.current!.focus();
  };

  const LogoutHandler = async () => {
    try {
      if (window.confirm("정말 로그아웃 하시겠습니까?")) {
        await axios.post("/api/auth/logout");
        dispatch(userActions.logout());
        dispatch(userAuthActions.logout());
        navigate("/blind");
      }
    } catch (error) {
      console.log("logout error: ", error);
    }
  };

  /* scroll 이벤트 리스너 등록 */
  useEffect(() => {
    window.addEventListener("scroll", navScrollHandler);

    function navScrollHandler() {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
    return () => {
      window.removeEventListener("scroll", navScrollHandler);
    };
  });

  return (
    <S.NavContainer navBlackShow={navBlackShow}>
      <S.Logo
        backgroundImage={
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        }
        onClick={onClickLogo}
      />

      <S.NavSecondary>
        <S.SearchForm ref={ref} isClickSearch={isClickSearch}>
          <S.SearchFormIcon
            aria-label="search form icon button"
            isClickSearch={isClickSearch}
            onClick={clickHandler}
          >
            <FaSearch />
          </S.SearchFormIcon>
          <S.SearchFormInput
            type="text"
            isClickSearch={isClickSearch}
            value={searchValue}
            onChange={changeHandler}
            placeholder="영화를 검색하세요."
            ref={searchRef}
          />
        </S.SearchForm>

        <S.ProfileIconImg
          alt="User profile"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        />
        <S.LogoutBtn aria-label="logout button" onClick={LogoutHandler}>
          로그아웃
        </S.LogoutBtn>
      </S.NavSecondary>
    </S.NavContainer>
  );
};
export default Nav;
