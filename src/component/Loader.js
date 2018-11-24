import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = props => (
  <ContentLoader
    height={75}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="75" y="45" rx="4" ry="4" width="117" height="6.4" />
    <rect x="75" y="35" rx="3" ry="3" width="85" height="6.4" />
    <circle cx="37" cy="40" r="35" />
  </ContentLoader>
);

export const ImageLoader = props => (
  <ContentLoader
    height={75}
    width={100}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <circle cx="32" cy="35" r="30" />
  </ContentLoader>
);

export const Loader = () => (
    <div className="lds-dual-ring"></div>
)

export default MyLoader;
