import { useState, useEffect } from "react";
import SmileIcon from "./SmileIcon"; // Import the smile icon component

const MovingSmile = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(true);
  const [image, setImage] = useState("bomba");
  const doAnimation = (im: string) => {
    setVisible(false);

    setTimeout(() => {
      setImage(im);
      setVisible(true);
    }, 1000);
  };
  useEffect(() => {
    let { x, y } = position;
    let im = "bomba";
    let xDirection = 1;
    let yDirection = 1;
    let rot = rotation;
    const moveIcon = () => {
      const currentx = x;
      const currenty = y;
      const maxX = window.innerWidth - 50; // Adjust the values based on your icon's dimensions
      const minX = 0;
      const maxY = window.innerHeight - 50;
      const minY = 0;

      const random = Math.random();

      x = Math.min(Math.max(x + random * xDirection, minX), maxX);
      y = Math.min(Math.max(y + random * yDirection, minY), maxY);

      if (currentx === x) {
        doAnimation("bomba");
        xDirection = -xDirection;
      }
      if (currenty === y) {
        doAnimation("bomba");
        yDirection = -yDirection;
      }
      setPosition({
        x: x,
        y: y,
      });
    };

    // 1 second, matching the animation delay

    const intervalId = setInterval(() => {
      moveIcon();
      rot = rot + 1;
      setRotation(rot);
    }, 2); // Adjust the interval time as needed

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        rotate: `${rotation}deg`,
        zIndex: 1000, // Ensure the icon is on top of other content
      }}
    >
      <SmileIcon isVisible={visible} image={image} />
    </div>
  );
};

export default MovingSmile;
