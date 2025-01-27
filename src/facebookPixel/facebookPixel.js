import ReactPixel from "react-facebook-pixel";

export const initFacebookPixel = () => {
  ReactPixel.init("1391827555520798");
  ReactPixel.pageView(); 
};

export const trackEvent = (eventName, data) => {
  ReactPixel.track(eventName, data);
  ReactPixel.track('PageView', {
    path: window.location.pathname
  });
};
