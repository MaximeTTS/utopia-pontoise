import React, { FC } from "react";
import ContentFooter from "./ContentFooter";

const Footer: FC = () => (
  <div className="relative h-[800px]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
    <div className="fixed bottom-0 h-[800px] w-full">
      <ContentFooter />
    </div>
  </div>
);

export default Footer;
