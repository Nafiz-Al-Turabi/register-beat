import ReactPixel from "react-facebook-pixel";

export const initFacebookPixel = () => {
  ReactPixel.init("365387802985192");
  ReactPixel.pageView(); 
};

export const trackEvent = (eventName, data) => {
  ReactPixel.track(eventName, data);
  ReactPixel.track('PageView', {
    path: window.location.pathname
  });
};
