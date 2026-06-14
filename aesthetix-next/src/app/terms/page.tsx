"use client";
import { motion } from "motion/react";
import { Seo } from "@/components/Seo";

export const metadata = {
  title: "Terms & Conditions | Aesthetix Studio",
  description: "Read the terms and conditions for using Aesthetix Studio services.",
};

export default function TermsPage() {
  return (
    <>
      <Seo {...metadata} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-12 text-[#F0EBE0]"
      >
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          Terms & Conditions
        </h1>
        <p className="mb-4" style={{ lineHeight: "1.7" }}>
          {/* Replace with actual terms content */}
          This is where the terms and conditions content will go. It outlines the rules and regulations for using our services.
        </p>
        {/* Add more sections as needed */}
      </motion.div>
    </>
  );
}
