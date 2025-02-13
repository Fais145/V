import { motion } from "framer-motion";

const Heading = () => {
  return (
  
    <div className="absolute left-1 top-15">
    <motion.div
        initial={{ opacity: 0, y: -50 }} // Starts off invisible and slightly below
        animate={{ opacity: 1, y: 0 }} // Moves up and fades in
        transition={{ type: "spring", stiffness: 80, duration: 1.2, delay: 0.5 }} // Smooth animation
        className=" text-6xl rounded-lg ml-10 z-50 left-0 top-0 size-full relative font-meaculpa"
      >
       Dear Yvonne, 
       
      </motion.div>

      </div>
  )
}

export default Heading

