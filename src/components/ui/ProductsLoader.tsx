import { motion } from 'framer-motion';

export function ProductsLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Animated medical cross loader */}
      <div className="relative w-24 h-24 mb-8">
        {/* Outer rotating circle */}
        <motion.div
          className="absolute inset-0 border-4 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-2 border-4 border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Medical cross in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {/* Vertical bar */}
            <motion.div
              className="w-3 h-10 bg-gradient-to-b from-primary to-primary/70 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Horizontal bar */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 bg-gradient-to-r from-primary/70 via-primary to-primary/70 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Loading text with shimmer */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h3
          className="text-xl font-semibold text-foreground mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Products
        </motion.h3>
        <p className="text-muted-foreground text-sm">Please wait while we fetch the latest products...</p>
      </motion.div>
      
      {/* Animated dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      
      {/* Skeleton preview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-card rounded-lg overflow-hidden border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="h-32 bg-muted"
              animate={{
                background: [
                  'linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground)/0.1) 50%, hsl(var(--muted)) 100%)',
                ],
                backgroundPosition: ['-200% 0', '200% 0'],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            <div className="p-3 space-y-2">
              <motion.div
                className="h-4 bg-muted rounded"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
              <motion.div
                className="h-3 bg-muted rounded w-2/3"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
