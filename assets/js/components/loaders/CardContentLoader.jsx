import React from "react";
import ContentLoader from "react-content-loader";

const CardContentLoader = props => (
    <ContentLoader
        speed={2}
        width="100%"
        height={250}
        viewBox="0 0 100% 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
      <rect x="25%" y="5" rx="0" ry="3" width="50%" height="54" />
      <rect x="25%" y="60" rx="3" ry="3" width="50%" height="205" />
    </ContentLoader>
);

export default CardContentLoader;