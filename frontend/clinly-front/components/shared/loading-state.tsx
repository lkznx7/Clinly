"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function LoadingState() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 p-6">
      <motion.div variants={fadeUp} className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Card>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp}>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-3 p-6">
      <motion.div variants={fadeUp}>
        <Skeleton className="h-10 w-full" />
      </motion.div>
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div key={i} variants={fadeUp}>
          <Skeleton className="h-14 w-full" />
        </motion.div>
      ))}
    </motion.div>
  );
}
