import { useState, useEffect } from "react";
import Carousel from "../Carousel";
import DesktopCard from "./DesktopCards";

export default function ResponsiveDisplay() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isDesktop ? <Carousel /> : <DesktopCard />}</>;
}
