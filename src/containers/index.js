import React from "react";
import loadable from "@loadable/component";

const loadFallback = {fallback: <div>Loading...</div>};
const containers = {
  Home: loadable(() => import("./home"), loadFallback),
  About: loadable(() => import("./about"), loadFallback),
  Users: loadable(() => import("./users"), loadFallback),
  RTCDemo: loadable(() => import("./rtc-demo"), loadFallback),
  NotFound: loadable(() => import("./not-found"), loadFallback),
}

export default containers;