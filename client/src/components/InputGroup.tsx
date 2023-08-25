import React, { useState, useEffect } from "react";
import * as S from "../styles/InputGroupStyle";

interface Props {
  apiCatchCnt: number;
  type?: string;
  placeholder?: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup = ({
  apiCatchCnt,
  type = "text",
  placeholder = "",
  error,
  value,
  setValue,
}: Props) => {
  const [isErrorState, setisErrorState] = useState<boolean>(false);
  useEffect(() => {
    if ((error?.length as number) > 0 || error !== undefined) {
      // console.log(apiCatchCnt, error);
      setisErrorState(true);
    } else {
      setisErrorState(false);
    }
  }, [error, apiCatchCnt]);

  return (
    <>
      <S.Input
        isError={isErrorState}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          // console.log(error);
          setValue(e.target.value);
          setisErrorState(false);
        }}
      />
      {(error?.length as number) > 0 && isErrorState && (
        <S.Small>{error}</S.Small>
      )}
    </>
  );
};

export default React.memo(InputGroup);
