import React from "react";
import { Button } from "antd-mobile";
import Navigation from "./nav";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Navigation />
      <Button type="primary">Button</Button>
    </div>
  );
}