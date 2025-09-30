import { gsap } from 'gsap';

export const storyDetailAnimations = {
  enter: () => {
    // Título principal
    gsap.from(".story-title", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Subtítulo
    gsap.from(".story-subtitle", {
      y: -30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });

    // Bloques de contenido
    gsap.from(".story-block", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.6,
      ease: "power2.out"
    });

    // Botón de volver
    gsap.from(".back-button", {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 1.2,
      ease: "back.out(1.7)"
    });
  }
};
