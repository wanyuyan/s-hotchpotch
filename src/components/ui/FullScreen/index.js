import React, { useState } from "react";
import CustomIcon from "Components/ui/CustomIcon";
import "./index.scss";

// console.log("Enlarge", Enlarge);

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
    <div className="full-screen-icon">
      <CustomIcon
        type={isFullScreen
          ? "ensmall"
          : "enlarge"
        }
        size="large"
        onClick={fullScreen}
      />
    </div>
  );
}