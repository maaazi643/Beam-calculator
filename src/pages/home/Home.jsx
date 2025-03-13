import { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { beamActions } from "../../store/beam";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beamActions.reset());
  }, [dispatch]);

  return (
    <div className="relative bg-[#7B3F00] flex flex-col h-screen items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-[#F0E68C] min-h-[50%] max-w-[50%] shadow-lg rounded-3xl py-20 px-10 flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-black text-4xl font-bold text-center"
        >
          GROUP 8 Beam Calculator
        </motion.h1>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="mt-10 w-full max-w-sm"
        >
          <NavLink
            to="/beam-calculator/question"
            className="block bg-white text-teal-600 font-semibold text-lg text-center py-4 px-10 rounded-2xl shadow-md border border-teal-300 hover:bg-teal-500 hover:text-white transition-all"
          >
            Go to Beam Calculator
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
