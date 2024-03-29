"use client";

import { useState } from "react";
import lerp from "../common/lerp";
import { hypothenuse } from "../common/hypothenuse";

export default function ShinyCard({
  children,
  zTranslateMaxStrength = 16,
  rotationMaxStrength = 6,
  shineXMaxStrength = 0.1,
  shineYMaxStrength = 0.25,
}: {
  children: React.ReactNode;
  zTranslateMaxStrength?: number;
  rotationMaxStrength?: number;
  shineXMaxStrength?: number;
  shineYMaxStrength?: number;
}) {
  const [appearance, setAppearance] = useState<ShinyCardAppearance>({
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      a: 0,
    },
    translate: {
      x: 0,
      y: 0,
      z: 0,
    },
    shine: {
      rotation: 0,
      strength: 0,
    },
  });

  const handleMouseLeave = () => {
    // Reset values on leave
    setAppearance({
      rotation: {
        x: 0,
        y: 0,
        z: 0,
        a: 0,
      },
      translate: {
        x: 0,
        y: 0,
        z: 0,
      },
      shine: {
        rotation: 0,
        strength: 0,
      },
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    // Get mouse position relative to element
    const localX = event.nativeEvent.offsetX;
    const localY = event.nativeEvent.offsetY;
    const width = event.currentTarget.clientWidth;
    const height = event.currentTarget.clientHeight;

    const centerXOffset = localX - width / 2;
    const centerYOffset = localY - height / 2;

    // x and y axis of rotation are based on how far the mouse is vertically
    // and horizontally from the center of the element, respectively.
    const x = lerp(0, 1, centerYOffset / (height / 2));
    const y = lerp(0, 1, -centerXOffset / (width / 2));
    // angle of rotation is a based on how far the mouse is from the center
    // of the element. The further away, the more rotation.
    const a = lerp(
      0,
      rotationMaxStrength,
      hypothenuse(centerXOffset, centerYOffset) /
        hypothenuse(width / 2, height / 2)
    );
    const rotation = {
      x: x,
      y: y,
      z: 0,
      a: a,
    };

    const translate = {
      x: 0,
      y: 0,
      z: zTranslateMaxStrength,
    };

    // The shine strength is based on how far the mouse is from the center.
    const shineXStrength = lerp(
      0,
      shineXMaxStrength,
      Math.abs(centerXOffset / (width / 2))
    );
    const shineYStrength = lerp(
      0,
      shineYMaxStrength,
      Math.abs(centerYOffset / (height / 2))
    );
    // The shine should be opposite to where the mouse is.
    const shineRotation =
      Math.atan2(centerYOffset, centerXOffset) + Math.PI / 2;
    const shineStrength = shineXStrength + shineYStrength;
    const shine = {
      rotation: shineRotation,
      strength: shineStrength,
    };

    setAppearance({
      rotation: rotation,
      translate: translate,
      shine: shine,
    });
  };

  return (
    <div
      style={{
        transform: `
            perspective(${600}px)
            translateZ(${appearance.translate.z}px)`,
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `
              perspective(${600}px)
              rotate3d(
                ${appearance.rotation.x},
                ${appearance.rotation.y},
                ${appearance.rotation.z}, 
                ${appearance.rotation.a}deg
              )`,
          transitionProperty: "transform",
          transitionDuration: "2s",
          // Rotates fast at first, then really slows down.
          transitionTimingFunction: "cubic-bezier(.05,.69,.17,.97)",
        }}
      >
        {children}
        <div
          className=" absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(
                ${appearance.shine.rotation}rad,
                rgba(255, 255, 255, ${appearance.shine.strength}) 0%,
                rgba(255, 255, 255, ${appearance.shine.strength}) 5%,
                rgba(255, 255, 255, 0) 80%
              )`,
          }}
        ></div>
      </div>
    </div>
  );
}
