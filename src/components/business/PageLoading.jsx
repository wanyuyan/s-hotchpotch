import React from "react";
import { Icon } from "antd-mobile";

const PageLoading = () => (
  <div className="load-container" style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <Icon type="loading" size="lg" />
  </div>
);

export default PageLoading;