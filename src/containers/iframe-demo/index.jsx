import React, { useEffect } from "react";
import { mockTest } from "../../api/demo";
import arrowImg from "Imgs/up_arrow.png";
import catImg from "Imgs/cool-cat.jpeg"

const IframeDemo = props => {
  useEffect(() => {
    mockTest().then(res => console.log("res", res));
  }, []);

  return (
    <div className="app-container">
      {/* <iframe
        height="80%"
        width="100%"
        scrolling="auto"
        src="https://item.m.jd.com/product/12403508.html?dist=jd" /> */}

      <img src={catImg} width="100px" height="100px" />
      <div style={{
        background: `url(${arrowImg})`,
        width: 100,
        height: 100,
        border: "1px solid #aaa"
      }}></div>
    </div>
  );
}

export default IframeDemo;