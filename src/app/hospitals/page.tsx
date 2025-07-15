'use client'
import { useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {useRouter} from "next/navigation";

const Hospitals = () => {
    const [points, setPoints] = useState(0.8)
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const pointerStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scrollableElement = scrollableContainerRef.current;
    if (!scrollableElement) return;

    const handleScroll = () => {
      if (scrollableElement.scrollTop > 10) {
        scrollableElement.setAttribute('data-vaul-no-drag', 'true');
      } else {
        scrollableElement.removeAttribute('data-vaul-no-drag');
      }
    };

    scrollableElement.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      scrollableElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="h-full w-full max-w-[650px] bg-white">
      <Drawer
        defaultOpen={true}
        snapPoints={[0.3, 0.8]}
        activeSnapPoint={points}
        setActiveSnapPoint={setPoints}
        dismissible={false}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Hospitals</DrawerTitle>
          </DrawerHeader>
          <div
            ref={scrollableContainerRef}
            className="overflow-y-auto p-4"
            style={{ maxHeight: 'calc(100vh - 200px)' }} // Adjust max height as needed
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="h-12 border-b flex items-center"
              onPointerDown={(e) => {
                pointerStart.current = { x: e.clientX, y: e.clientY };
              }}
              onClick={(e) => {
                const endX = e.clientX;
                const endY = e.clientY;
                const distance = Math.sqrt(
                  Math.pow(endX - pointerStart.current.x, 2) +
                  Math.pow(endY - pointerStart.current.y, 2)
                );

                if (distance < 5) {
                  router.back()
                }
              }}
              >
                Hospital {i + 1}
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>

      <motion.div
        className="relative w-[200px] h-[100px] mt-[20px] bg-amber-200 rounded-[20px]"
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      <motion.div
        className="relative w-[100px] h-[100px] mt-[20px] bg-amber-200 rounded-[20px]"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 2
        }}
      />
      <div className="border border-b-cyan-700 w-full h-[700px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 },
          }}
          className="relative w-[200px] h-[100px] mt-[20px] bg-amber-200 rounded-[20px]"></motion.div>
        <motion.div animate={{ x: 90 }}
          transition={{ type: "spring" }}
          className="relative left-50 top-10 w-[250px] h-[250px] bg-amber-300 rounded-[20px]"></motion.div>
        <motion.div
          className="relative left-40 top-40 w-[200px] h-[200px] bg-amber-900 rounded-[20px]"></motion.div>
      </div>
    </main>
  )
}

export default Hospitals;
