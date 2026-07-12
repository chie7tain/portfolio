import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Fades + rises its children into view once, when they scroll into the
 * viewport. Opacity-only until triggered so nothing shifts layout. Respects
 * prefers-reduced-motion (the .reveal utility is neutralized in CSS). Falls
 * back to visible immediately where IntersectionObserver is unavailable (SSR,
 * jsdom tests).
 *
 * Uses the ref + effect pattern (not a callback ref) so that React 18
 * StrictMode's mount double-invoke re-observes cleanly instead of leaving the
 * element unobserved.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
