import React from "react";

const IframeDemo = props => {
  return (
    <div className="app-container">
      <iframe
        height="80%"
        width="100%"
        scrolling="auto"
        src="https://item.m.jd.com/product/12403508.html?dist=jd" />
    </div>
  );
}

export default IframeDemo;