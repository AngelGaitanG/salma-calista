import gsap from 'gsap';

export function animateStories() {
  const tl = gsap.timeline();

  // Animar títulos
  tl.from('.title', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
  .from('.subtitle', {
    y: -20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, "-=0.5");

  // Animar lista de historias con stagger
  tl.from('.story-item', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power3.out',
  }, "-=0.3");

  // Animar el botón
  tl.from('.back-button', {
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: 'back.out(1.7)',
  }, "-=0.2");

  return tl;
}
