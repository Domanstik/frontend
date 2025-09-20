export const springSm = { type: 'spring', stiffness: 300, damping: 24, mass: 0.6 };
export const springMd = { type: 'spring', stiffness: 320, damping: 26, mass: 0.65 };
export const springLg = { type: 'spring', stiffness: 360, damping: 28, mass: 0.7 };


export const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: springSm },
};
export const listStagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
