import React from "react";
import { NavBar, Icon } from "antd-mobile";

export default function TopNav(props) {
  const { title, history } = props;
  return (
    <div className="top-nav">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={history.goBack}
        rightContent={[
          <Icon key="1" type="ellipsis" />,
        ]}
      >
        {title}
      </NavBar>
    </div>
  );
}