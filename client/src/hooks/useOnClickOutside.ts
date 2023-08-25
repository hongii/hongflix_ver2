import React, { useEffect } from "react";
/* MovieModal.ts 에서의 className="modal"인 DOM객체인지 아닌지 판별하고,
맞다면 계속 모달창을 띄우고 아니라면(외부를 클릭한 것이라면) 모달창을 닫아주는 커스텀 훅*/
const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  setFunc: (type: boolean) => void,
  setIsClosed?: (type: boolean) => void
) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const modalOnOffListener = (
      event: CustomEvent<MouseEvent> | CustomEvent<TouchEvent>
    ) => {
      /* 클릭한 부분이 modal창 또는 검색창 내부인 경우 */
      if (
        !ref.current ||
        ref.current.contains(event.target as HTMLDivElement)
      ) {
        return;
      } else {
        /* 클릭한 부분이 modal창 또는 검색창 외부인 경우 */
        if (setIsClosed) {
          setIsClosed(true);
        }
        timer = setTimeout(() => {
          setFunc(false);
        }, 300);
      }
    };
    document.addEventListener("mousedown", modalOnOffListener as EventListener);
    document.addEventListener(
      "touchstart",
      modalOnOffListener as EventListener
    );
    //cf. mousedown event => 사용자가 해당 element에서 마우스 버튼을 눌렀을 때 발생
    // 		click evnet => 사용자가 해당 element를 클릭했을 때(버튼을 눌렀다가 떼었을 때) 발생

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      document.removeEventListener(
        "mousedown",
        modalOnOffListener as EventListener
      );
      document.removeEventListener(
        "touchstart",
        modalOnOffListener as EventListener
      );
    };
  }, [ref, setFunc, setIsClosed]);
};

export default useOnClickOutside;
