// home.animations.ts
import { gsap } from "gsap";

export const homeAnimations = {
  initAnimations(container: HTMLElement) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animar hero section
    tl.from(container.querySelector(".hero-photo svg"), {
      opacity: 0,
      y: 50,
      duration: 1,
    })
    .from(container.querySelector(".greeting h1"), {
      opacity: 0,
      y: 40,
      duration: 0.8,
    }, "-=0.6")
    .from(container.querySelector(".greeting p"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, "-=0.4");

    // Animar títulos de secciones
    tl.from(container.querySelectorAll("section h2"), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
    }, "-=0.3");

    // Animar notas
    tl.from(container.querySelectorAll(".note-card"), {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.15,
    });

    // Animar galería
    tl.from(container.querySelectorAll(".gallery-item"), {
      opacity: 0,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
    }, "-=0.4");

    // Animar íconos sociales
    tl.from(container.querySelectorAll(".social-media li"), {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      stagger: 0.1,
    }, "-=0.4");
  }
};
