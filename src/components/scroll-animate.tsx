"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export function ScrollAnimate({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(30px)";
      case "down":
        return "translateY(-30px)";
      case "left":
        return "translateX(30px)";
      case "right":
        return "translateX(-30px)";
      case "fade":
        return "none";
      default:
        return "translateY(30px)";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getInitialTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({ 
  children, 
  className = "",
  staggerDelay = 100 
}: StaggerChildrenProps) {
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <ScrollAnimate key={index} delay={index * staggerDelay}>
              {child}
            </ScrollAnimate>
          ))
        : children
      }
    </div>
  );
}
