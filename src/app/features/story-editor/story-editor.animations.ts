import { gsap } from 'gsap';

export const storyEditorAnimations = {

  enter: () => {
    gsap.from("h1.title", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });

    gsap.from(".input-group", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.from(".block-group-header", {
      y: 15,
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
      ease: "power2.out"
    });

    gsap.from(".block-item", {
      x: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.5
    });

    gsap.from(".buttons button", {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      stagger: 0.15,
      ease: "back.out(1.7)",
      delay: 0.6
    });
  },

  addBlockAnimation: (element: HTMLElement) => {
    gsap.from(element, {
      y: 10,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  }

};
