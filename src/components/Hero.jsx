import Heading from "./Heading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [backgroundVideoSrc, setBackgroundVideoSrc] = useState("videos/yvonne-1.mp4"); // State for background video source
  const [showValentine, setShowValentine] = useState(false);
  const [clickedYes, setClickedYes] = useState(false);
  const [clickedNo, setClickedNo] = useState(false);
  const [yesScale, setYesScale] = useState(1); // To scale the Yes button
  const [noScale, setNoScale] = useState(1); // To scale the No button
  const totalVideos = 3;
  const nextVdRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("audios/wisp.mp3"); // Load the audio file
    audioRef.current.loop = true; // Ensure it loops forever
    audioRef.current.volume = 0.4
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowValentine(true); // Show the "Will you be my Valentine?" message after 5 seconds
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);

    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => console.error("Audio play error:", error));
    }
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/videos/yvonne-${index}.mp4`;

  const handleVideoError = (e) => {
    console.error("❌ Video Failed to Load:", e.target.src);
  };


  const handleYesClick = () => {
    setClickedYes(true);
    setClickedNo(false); // Reset No button
    alert("hehe I'm so obsessed with you I love you!!!! my cutie 🥰");
  };

  const handleNoClick = () => {
    setClickedNo(true);
    setClickedYes(false); // Reset Yes button
    setYesScale(yesScale + 3); // Increase the scale of Yes button each time No is clicked
    setNoScale(noScale - 2); // Decrease the scale of No button
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg flex items-center justify-center"
      >
        {/* Centered current-video */}
        <div className="mask-clip-path absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg flex items-center justify-center">
          <div
            onClick={handleMiniVdClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
          >
            <video
              ref={nextVdRef}
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center"
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            />
          </div>
        </div>

        {/* Other videos */}
        <video
          ref={nextVdRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* Full-screen background video */}
        <video
          id="background-video"
          src={backgroundVideoSrc}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full w-screen object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        <Heading />

        {showValentine && (
          <motion.div
            className="absolute bottom-10 left-0 right-0 text-center text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, duration: 1.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-shadow">
              Will you be my Valentine?
            </h2>
            <motion.div
              className="mt-4"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <span role="img" aria-label="Heart">
                ❤️
              </span>
            </motion.div>

            {/* Yes Button */}
            <motion.button
              className={`mt-8 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg text-xl hover:bg-pink-600 transition-all ${clickedYes ? "scale-110" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
              style={{
                transform: `scale(${yesScale})`, // Dynamically scaling Yes button
                marginRight: "20px", // Add space between the buttons
              }}
            >
              Yes
            </motion.button>

            {/* No Button */}
            <motion.button
              className={`mt-8 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-lg text-xl hover:bg-gray-600 transition-all ${clickedNo ? "scale-90" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNoClick}
              style={{
                transform: `scale(${noScale})`, // Dynamically scaling No button
                marginLeft: "20px", // Add space between the buttons
              }}
            >
              No
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;