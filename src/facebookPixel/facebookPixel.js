import ReactPixel from "react-facebook-pixel";

export const initFacebookPixel = () => {
  ReactPixel.init("1391827555520798");
  ReactPixel.pageView({
    path: window.location.pathname
  }); 
};

export const trackEvent = (eventName) => {
  ReactPixel.track(eventName);
  // Track page views with route name
  ReactPixel.track('PageView', {
    path: window.location.pathname
  });
};
