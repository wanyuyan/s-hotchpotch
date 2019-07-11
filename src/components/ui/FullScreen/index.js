import React, { useState } from "react";
import { Icon } from "antd-mobile";
import "./index.scss";

export default function FullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 全屏或取消全屏
  function fullScreen() {
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();      // IE11
      }
      setIsFullScreen(false);
    } else {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE11
      }
      setIsFullScreen(true);
    }
  }

  return (
    <div className="full-screen">
      <Icon
        type={isFullScreen ? "cross-circle" : "check-circle-o"}
        onClick={fullScreen}
      />
    </div>
  );
}