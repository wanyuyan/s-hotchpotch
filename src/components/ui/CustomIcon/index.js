import React from "react";

const CustomIcon = ({ type, size = "md", className = "", ...restProps }) => (
  <svg
    className={`am-icon am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={`#${type}`} />
  </svg>
 );

export default CustomIcon;