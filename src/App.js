import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Navbar,
  Loader,
  Footer,
  About,
  Skills,
  Projects,
  Contact,
} from "./components/index.js";
import { ArrowUp } from "lucide-react";
import AnimatedBackground from "./components/animate-background.js";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleDataFromChild = (data) => {
    setMenuOpen(data);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300 ? setVisible(true) : setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="relative bg-gradient-primary text-text-primary min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar sendDataToParent={handleDataFromChild} />
        {loading ? (
          <Loader />
        ) : (
          !menuOpen && (
            <>
              <AnimatePresence>
                {visible && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="GO TO TOP"
                    className="fixed right-10 bottom-10 p-3 rounded-full bg-accent-primary text-neutral-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 z-50"
                    onClick={scrollToTop}
                  >
                    <ArrowUp size={24} />
                  </motion.button>
                )}
              </AnimatePresence>
              <About />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
