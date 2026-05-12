import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  effect?: "fade" | "slide-up" | "slide-left" | "zoom" | "rotate";
  className?: string;
  delay?: number; // opzionale, in millisecondi
}

export default function ScrollReveal({
  children,
  effect = "slide-up",
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay); // ritardo opzionale
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className || ""} ${effect} ${isVisible ? "active" : ""}`}
    >
      {children}
    </div>
  );
}
