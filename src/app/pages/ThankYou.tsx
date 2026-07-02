import { Link } from "react-router";
import { CheckCircle, ArrowRight, Clock, Calendar } from "lucide-react";
import { motion } from "motion/react";

export default function ThankYou() {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center px-5 py-20">
      <div className="max-w-md w-full text-center">
        <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:300, damping:22 }} className="w-16 h-16 rounded-2xl bg-success-muted flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </motion.div>
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.1 }}>
          <h1 className="text-foreground mb-3" style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:800, letterSpacing:"-0.025em" }}>We got your message!</h1>
          <p className="text-muted-foreground mb-8" style={{ fontSize:"16px", lineHeight:1.7 }}>Thank you for reaching out. We'll review your brief and get back to you within 4 business hours.</p>
          <div className="bg-card border border-border rounded-2xl p-5 mb-8 text-left space-y-4">
            <h3 className="text-foreground" style={{ fontSize:"14px", fontWeight:700 }}>What happens next</h3>
            {[{ icon:Clock, title:"Within 4 hours", desc:"We'll review your brief and reply with any clarifying questions." },{ icon:Calendar, title:"Discovery call", desc:"If it's a good fit, we'll propose a 30-min call to talk through the details." }].map(({ icon:Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-muted-foreground" /></div>
                <div>
                  <div className="text-foreground" style={{ fontSize:"13px", fontWeight:600 }}>{title}</div>
                  <div className="text-muted-foreground" style={{ fontSize:"13px" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl no-underline hover:bg-foreground/90 transition-colors" style={{ fontSize:"13px", fontWeight:600 }}>
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground no-underline transition-colors px-5 py-2.5" style={{ fontSize:"13px" }}>
              Read our journal
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
