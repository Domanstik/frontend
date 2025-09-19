export const springSm = { type: 'spring', stiffness: 320, damping: 26 };
export const springMd = { type: 'spring', stiffness: 260, damping: 24 };
export const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: springSm },
};
export const listStagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
