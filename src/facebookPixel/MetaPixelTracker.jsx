import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MetaPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof fbq === "function") {
      fbq("track", "PageView");
    }
  }, [location.pathname]);

  return null;
};

export default MetaPixelTracker;
