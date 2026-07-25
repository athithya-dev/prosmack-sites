"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const desktopScale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);
  const mobileScale = useTransform(scrollYProgress, [0, 1], [0.85, 0.95]);
  const scale = isMobile ? mobileScale : desktopScale;
  const translate = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div
      className="w-full flex flex-col items-center justify-center relative px-2 sm:px-4 md:px-10 mx-auto"
      style={{
        minHeight: isMobile ? "auto" : "1050px",
        paddingTop: isMobile ? "30px" : "60px",
        paddingBottom: isMobile ? "30px" : "60px",
      }}
      ref={containerRef}
    >
      <div
        className="w-[92vw] md:w-full max-w-5xl relative flex flex-col items-center justify-center mx-auto"
        style={{
          perspective: "1500px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div w-full text-center z-10 relative"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  isMobile,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  isMobile: boolean;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        height: isMobile ? "auto" : "600px",
      }}
      className="w-full mt-4 md:-mt-8 border-2 md:border-4 border-[#6C6C6C] p-2 md:p-6 bg-card rounded-[16px] md:rounded-[30px] shadow-2xl z-20 relative mx-auto"
    >
      <div className="h-full w-full overflow-hidden rounded-[12px] md:rounded-2xl bg-background p-2 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
