import { useRef, useState } from "react";

const useAccordion = () => {
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState("0px");

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setShow((prevState) => !prevState);
    // @ts-ignore
    setHeight(show ? "0px" : `${contentSpace.current.scrollHeight}px`);
  }
  function closeAccordion() {
    setShow(false);
    setHeight("0px");
  }
  return { show, height, toggleAccordion, closeAccordion, contentSpace };
};

export default useAccordion;
