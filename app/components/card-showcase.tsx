"use client";

import { useState } from "react";
import lerp from "../lib/lerp";

export default function CardShowcase({
  children,
}: {
  children: React.ReactNode;
}) {
  const [z, setZ] = useState(0);
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [shineRotation, setShineRotation] = useState(0);
  const [shineStrength, setShineStrength] = useState(0.2);

  const handleMouseLeave = () => {
    // Reset values on leave
    setZ(0);
    setXRotation(0);
    setYRotation(0);
    setShineRotation(0);
    setShineStrength(0);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    // 👇 Get mouse position relative to element
    const localX = event.nativeEvent.offsetX;
    const localY = event.nativeEvent.offsetY;

    const width = event.currentTarget.clientWidth;
    const height = event.currentTarget.clientHeight;

    const centerXOffset = localX - width / 2;
    const centerYOffset = localY - height / 2;

    const xRotation = centerYOffset / (height / 2);
    const yRotation = -centerXOffset / (width / 2);
    setXRotation(xRotation);
    setYRotation(yRotation);
    setRotation(
      4 *
        ((Math.abs(centerXOffset) + Math.abs(centerYOffset)) /
          (width / 2 + height / 2))
    );

    const shineXStrength = lerp(0, 0.1, Math.abs(centerXOffset / (width / 2)));
    const shineYStrength = lerp(
      0,
      0.25,
      Math.abs(centerYOffset / (height / 2))
    );
    setShineRotation(Math.atan2(centerYOffset, centerXOffset) + Math.PI / 2);
    setShineStrength(shineXStrength + shineYStrength);
    setZ(16);
  };

  return (
    <div className="p-4 rounded-[2.5rem] bg-white">
      <div
        style={{
          transform: `perspective(${600}px) translateZ(${z}px)`,
        }}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(${600}px) rotate3d(${xRotation}, ${yRotation}, 0, ${rotation}deg)`,
            transitionProperty: "transform",
            transitionDuration: "3s",
            transitionTimingFunction: "cubic-bezier(.05,.69,.17,.97)",
          }}
        >
          {children}
          <div
            className=" absolute top-0 left-0 w-full h-full"
            style={{
              background: `linear-gradient(
            ${shineRotation}rad,
            rgba(255, 255, 255, ${shineStrength}) 0%,
            rgba(255, 255, 255, ${shineStrength}) 5%,
            rgba(255, 255, 255, 0) 80%
          )`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
