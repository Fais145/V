import { motion } from "framer-motion";

const PhotoRoulette = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }} // Delayed appearance
      className="flex flex-col items-center justify-center mt-20 md:mt-40 bg-amber-300 w-screen"
    >
      <motion.div
        className="relative w-60 h-60 bg-gray-300 rounded-3xl flex justify-center items-center 
        xl:ml-60 lg:ml-40 md:ml-20 md:w-100 md:h-100 hover:ring-8 hover:ring-yellow-400/50 shadow-2xl"

        whileHover={{ scale: 1.1 }} // Scale up on hover
        whileTap={{ scale: 0.95 }} // Tap effect
        animate={{ rotate: 0 }} // Shake effect animation
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Image inside square */}
        <motion.video
          src="/src/assets/videos/yvonne-1.mp4" // Path to your video
          alt="Video"
          className="w-full h-full object-cover rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // Fade-in effect
          whileHover={{ opacity: 1 }} // Keep visible on hover
          transition={{ duration: 0.5 }}
          autoPlay
          loop
          muted
        />
        </motion.div>
      {/* Text under the square */}
      <div className="mt-4 text-white font-bold text-6xl font-meaculpa mt-30 ml-53">
        Hover for a surprise
      </div>
    </motion.div>
  );
};

export default PhotoRoulette;
