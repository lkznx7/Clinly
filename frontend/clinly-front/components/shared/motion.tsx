"use client";

import { type Variants, type HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.2 } },
};

export const hoverScale = {
  whileHover: { scale: 1.01, transition: { duration: 0.2 } },
};

export const tapScale = {
  whileTap: { scale: 0.98 },
};

type StaggerListProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

export function StaggerList({ children, className, ...props }: StaggerListProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function StaggerItem({ children, className, interactive = false, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      {...(interactive ? hoverLift : {})}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

export function PageTransition({ children, className, ...props }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
