import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const FloatingCartButton = () => {
  const { totalItems, toggleCart, isAnimating } = useCart();

  if (totalItems === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-cyan-600 text-white shadow-2xl flex items-center justify-center hover:shadow-primary/30 transition-shadow"
    >
      {/* Cart Icon with Animation */}
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <ShoppingCart className="w-7 h-7" />
      </motion.div>

      {/* Item Count Badge */}
      <AnimatePresence>
        <motion.div
          key={totalItems}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center shadow-lg"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {totalItems}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Pulse Animation when item added */}
      {isAnimating && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 rounded-full bg-primary"
        />
      )}
    </motion.button>
  );
};
