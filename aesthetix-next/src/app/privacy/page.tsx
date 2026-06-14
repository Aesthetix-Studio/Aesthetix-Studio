"use client";
import { motion } from "motion/react";
import { Seo } from "@/components/Seo";

export const metadata = {
  title: "Privacy Policy | Aesthetix Studio",
  description: "Read Aesthetix Studio's privacy policy and how we handle your data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mb-4" style={{ lineHeight: "1.7" }}>
          {/* Replace with actual policy content */}
          This is where the privacy policy content will go. It outlines how we collect, use, and protect your personal information.
        </p>
        {/* Add more sections as needed */}
      </motion.div>
    </>
  );
}
