import { useEffect, useRef, useState } from "react";

interface AnimatedTitleProps {
  children: string;
}

export default function AnimatedTitle({ children }: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);           // aggiorna lo stato quando entra in viewport
          //observer.unobserve(el);       // opzionale: anima solo la prima volta
        } else {
          setIsVisible(false);           // aggiorna lo stato quando entra in viewport
        }
      },
      {
        threshold: 0.2,                 // 20% visibile
        rootMargin: "0px 0px -20px 0px"         // aggiusta l’inizio dell’animazione
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={ref}
      className={isVisible ? "animate-line" : ""}
    >
      {children}
    </h1>
  );
}

