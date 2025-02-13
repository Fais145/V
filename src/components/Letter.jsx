import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Letter = () => {

    const [showPoem, setShowPoem] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowPoem(true);
        }, 10000);

    
    return () => clearTimeout(timer); // Cleanup function
    }, []);

    const poemLines = [
        "I've loved you in the quiet moments,",
        "when words were few, but hearts spoke loud,",
        "in the rush of life, and in the stillness,",
        "where we found peace, even in the crowd.",
        "",
        "In the place we’ve made together,",
        "where time bends and we find our way,",
        "your laughter brightens every corner,",
        "and your touch holds me, come what may.",
        "",
        "I've written you in the stars above,",
        "in the breeze that whispers through the trees,",
        "in every moment that we’ve shared,",
        "in every memory, you’re here with me.",
        "",
        "So here we stand, side by side,",
        "our roots forever intertwined,",
        "and I promise, with all of my heart,",
        "I’ll love you, always, until the end of time."
      ];
      

  return (
     <div className="absolute z-20 left-10 top-1/4 max-w-lg text-white">
      {showPoem &&
        poemLines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 3,
              delay: index * 0.3, // Staggered effect
            }}
            className="text-lg sm:text-xl md:text-2xl text-emerald-400 italic font-gorditas tracking-wide leading-relaxed"
          >
            {line}
          </motion.p>
        ))}
    </div>
  );
};

  


export default Letter