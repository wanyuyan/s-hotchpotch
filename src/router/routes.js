import React from "react";
import loadable from "@loadable/component";

const loadFallback = {fallback: <div>Loading...</div>};
const containers = {
  Home: loadable(() => import(/* webpackChunkName: "home" */"../containers/home"), loadFallback),
  RTCDemo: loadable(() => import(/* webpackChunkName: "rtc-demo" */"../containers/rtc-demo"), loadFallback),
  NotFound: loadable(() => import(/* webpackChunkName: "not-found" */"../containers/not-found"), loadFallback),
}

export default containers;