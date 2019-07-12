import React from "react";
import loadable from "@loadable/component";
import PageLoading from "Components/business/PageLoading";

const loadFallback = {fallback: <PageLoading />};
const containers = {
  Home: loadable(() => import(/* webpackChunkName: "home" */"../containers/home"), loadFallback),
  RTCDemo: loadable(() => import(/* webpackChunkName: "rtc-demo" */"../containers/rtc-demo"), loadFallback),
  IframeDemo: loadable(() => import(/* webpackChunkName: "iframe-demo" */"../containers/iframe-demo"), loadFallback),
  NotFound: loadable(() => import(/* webpackChunkName: "not-found" */"../containers/not-found"), loadFallback),
}

export default containers;