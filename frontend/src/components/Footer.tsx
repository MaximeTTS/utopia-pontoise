import React, { FC } from "react";
import ContentFooter from "./ContentFooter";

const Footer: FC = () => (
  <div className="relative h-[600px]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
    <div className="fixed bottom-0 h-[600px] w-full">
      <ContentFooter />
    </div>
  </div>
);

export default Footer;
