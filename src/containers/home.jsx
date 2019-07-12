import React from "react";
import { Link } from "react-router-dom";
import TopNav from "Components/business/TopNav";
import Signature from "Components/ui/Signature";
import FullScreen from "Components/ui/FullScreen";

export default function Home(props) {
  return (
    <div>
      <TopNav title="Digital Man" history={props.history} />
        <Link to="/rtc">Baidu Rtc</Link>
      <Signature />
      <FullScreen />
    </div>
  );
}