import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    console.log(ref.current?.contains(e.target));
    if (ref.current && !ref.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};

export default useOutsideClick;
