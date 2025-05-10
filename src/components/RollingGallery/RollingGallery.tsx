import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  type PanInfo,
} from "framer-motion";

const IMGS: string[] = [
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.21%20(1).jpeg?alt=media&token=6778d96e-5c74-4dc8-9e18-aff40753e41a",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.21%20(2).jpeg?alt=media&token=f287633a-69a0-4528-86f7-4cc9277ad6b4",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.21%20(3).jpeg?alt=media&token=af5e8915-c099-4b1a-bf81-bf34fc62e262",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.21%20(4).jpeg?alt=media&token=f907d878-6bf5-4c42-8a25-9deeafaf4e19",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.21%20(6).jpeg?alt=media&token=493a6b25-31b3-4d76-a089-54db2455e34f",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.21%20(7).jpeg?alt=media&token=7ab418d8-1832-4a76-99cf-4c30e01611b5",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.22%20(1).jpeg?alt=media&token=3d453a76-c02e-4a43-bf65-875f91ab5731",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.22%20(2).jpeg?alt=media&token=e033f1e0-bcf7-4345-96b5-ff023daacffd",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.22%20(3).jpeg?alt=media&token=1493d89d-70bf-48c7-9b7b-dae075cc7c92",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.22%20(5).jpeg?alt=media&token=71ce9e2a-57ee-499b-b42c-95638a6a81b4",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.13.22.jpeg?alt=media&token=6b1ba093-38d2-4175-a7ae-c15b105adcfb",
  "https://firebasestorage.googleapis.com/v0/b/react-firebase-alurageek.appspot.com/o/fotos-dia-de-la-madre%2FWhatsApp%20Image%202025-05-10%20at%2007.28.19.jpeg?alt=media&token=a11d0690-0ccd-4e36-9669-771b325723f2"
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  // Use default images if none are provided
  const galleryImages = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    window.innerWidth <= 600
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry calculations
  const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  // Framer Motion values and controls
  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative mt-10 h-[200px] w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div className="flex items-center justify-center [perspective:900px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-[150px] w-[500px] border-2 border-white  object-cover transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[100px] sm:w-[220px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
