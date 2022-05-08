import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import useGetWindowDimensions from "../../hooks/useGetWindowDimensions";
const Loader = () => {
  const { width } = useGetWindowDimensions();

  const [contentLoaderWidth, setContentLoaderWidth] = useState<number>(300);
  useEffect(() => {
    if (width < 500) {
      setContentLoaderWidth(100);
    } else {
      setContentLoaderWidth(300);
    }
  }, [width]);
  return (
    <ContentLoader
      backgroundColor={
        document.documentElement.classList.contains("dark") ? "#333" : "#ddd"
      }
      foregroundColor={
        document.documentElement.classList.contains("dark") ? "#999" : "#ccc"
      }
      height={70}
      speed={1}
      className={"mb-5"}
      viewBox="0 0 380 70"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <rect
        x="80"
        y="17"
        rx="4"
        ry="4"
        width={contentLoaderWidth}
        height="13"
      />
      <rect
        x="80"
        y="40"
        rx="3"
        ry="3"
        width={contentLoaderWidth + 50}
        height="10"
      />
    </ContentLoader>
  );
};
export default Loader;
