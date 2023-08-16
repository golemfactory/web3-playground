import React from "react";

const SmileIcon = ({
  isVisible,
  image,
}: {
  isVisible: boolean;
  image: string;
}) => (
  <div
    className={`animated-image ${
      isVisible ? "visible-image" : "invisible-image"
    }`}
  >
    <img src={`./${image}.png`} alt="Smile Icon" width="50" height="50" />
  </div>
);

export default SmileIcon;
