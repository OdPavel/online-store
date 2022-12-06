import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={495}
    viewBox="0 0 280 495"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="things-block">
    <circle cx="324" cy="369" r="39" />
    <rect x="1" y="331" rx="9" ry="9" width="280" height="27" />
    <rect x="-1" y="374" rx="10" ry="10" width="280" height="53" />
    <rect x="4" y="452" rx="0" ry="0" width="84" height="27" />
    <rect x="124" y="440" rx="16" ry="16" width="152" height="45" />
    <rect x="0" y="-2" rx="0" ry="0" width="260" height="320" />
  </ContentLoader>
);

export default Skeleton;
