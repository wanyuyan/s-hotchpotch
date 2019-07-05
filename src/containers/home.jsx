import React from "react";
import { Link } from "react-router-dom";
import TopNav from "Components/business/TopNav";

export default function Home(props) {
  return (
    <div>
      <TopNav title="Digital Man" history={props.history} />
      <div className="container">
        <Link to="/rtc">Baidu Rtc</Link>
      </div>
    </div>
  );
}