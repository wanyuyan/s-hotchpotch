import React, { useState } from "react";
import { Button, InputItem } from "antd-mobile";
import ErrorBoundary from "Components/ui/ErrorBoundary";
import TopNav from "Components/business/TopNav/index.jsx";
import bRTC from "../../../public/baidu_rtc/brtc.sdk.js";
import "../../../public/baidu_rtc/main.css";
import "./index.scss";


function RTCDemo(props) {
  const [roomName, setRoomName] = useState("8887");
  const [roomin, setRoomIn] = useState(false);

  const start = () => {
    bRTC.start({
      server: "wss://rtc.exp.bcelive.com:8989/janus",
      appid: "75c664d50ae5432581fcfe2c9c3011d5",
      token: "0045b0bdff79b7b3874fe61f0316f2f76a9446dd1a475c664d50ae5432581fcfe2c9c3011d515507391219c0629530000000000",
      roomname: roomName,
      userid: "100" + Math.floor(Math.random() * 10000).toString(),
      displayname: "brtc webclient",
      feedid: 1000,
      remotevideoviewid: "therevideo",
      localvideoviewid: "herevideo",
      remotevideoviewid2: "therevideo2",
      remotevideoviewid3: "therevideo3",
      remotevideoviewid4: "therevideo4",
      remotevideoviewid5: "therevideo5",
      aspublisher: true,
      showvideobps: true,
      remotevideoon: function(idx) {
        console.log("remotevideoon, index:"+ idx);
      },
      remotevideooff: function(idx) {
        console.log("remotevideooff, index:"+ idx);
      },
      success: function() {
        setRoomIn(true);
      },
      error: function() {
        console.log("fail to get in");
      },
    });
  }

  const stop = () => {
    bRTC.stop();
  }

  return (
    <div>
      <TopNav title="BaiduRtc" history={props.history} />
      <div className="container">
        {roomin
          ? <Button type="primary" className="room-btn" onClick={stop}>退出房间</Button>
          : <div>
              <InputItem
                className="room-input"
                id="roomname"
                autoComplete="off"
                placeholder="请输入房间号"
                defaultValue={roomName}
                onChange={e => setRoomName(e.target.value)}
              />
              <Button type="primary" className="room-btn" onClick={start}>进入房间</Button>
            </div>
        }

        <div className="m-netcall hide" id="videos">
          <div className="row">
            <div className="col-md-4">
                <div className="m-netcall-video" id="herevideo"></div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row hide" >
            <div className="col-md-4">
              <div className="m-netcall-video" id="id1"></div>
            </div>
            <div className="col-md-4">
              <div className="m-netcall-video" id="id2"></div>
            </div>
            <div className="col-md-4">
              <div className="m-netcall-video" id="id3"></div>
            </div>
          </div>
        </div>

        <div style={{width: "70%", height: "90%"}} id="therevideo"></div>
        <div style={{width: "70%", height: "90%"}} id="therevideo2"></div>
        <div style={{width: "70%", height: "90%"}} id="therevideo3"></div>
        <div style={{width: "70%", height: "90%"}} id="therevideo4"></div>
        <div style={{width: "70%", height: "90%"}} id="therevideo5"></div>
      </div>
    </div>
  );
}

export default ErrorBoundary(RTCDemo);