import React from "react";
import loadable from "@loadable/component";

const loadFallback = {fallback: <div>Loading...</div>};
const containers = {
  Home: loadable(() => import(/* webpackChunkName: "home" */"./home"), loadFallback),
  About: loadable(() => import(/* webpackChunkName: "about" */"./about"), loadFallback),
  Users: loadable(() => import(/* webpackChunkName: "users" */"./users"), loadFallback),
  RTCDemo: loadable(() => import(/* webpackChunkName: "rtc-demo" */"./rtc-demo"), loadFallback),
  NotFound: loadable(() => import(/* webpackChunkName: "not-found" */"./not-found"), loadFallback),
}

export default containers;