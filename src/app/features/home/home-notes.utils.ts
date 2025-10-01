import rough from 'roughjs/bin/rough';

export function generateNoteBackground(element: HTMLElement, variant: number = 1) {
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  // Crear un SVG real
  const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  wrapper.setAttribute('class', 'note-bg');
  wrapper.setAttribute('width', `${width}`);
  wrapper.setAttribute('height', `${height}`);

  const rc = rough.svg(wrapper); // ✅ ahora sí es un SVGSVGElement

  const node =
    variant === 1
      ? rc.rectangle(0, 0, width, height, {
          roughness: 2,
          fill: 'rgba(255,255,200,0.6)',
          fillStyle: 'cross-hatch',
          stroke: '#333',
        })
      : rc.polygon(
          [
            [0, 10],
            [width - 10, 0],
            [width, height - 10],
            [10, height],
          ],
          {
            roughness: 3,
            fill: 'rgba(200,255,255,0.6)',
            fillStyle: 'dots',
            stroke: '#444',
          }
        );

  // limpiar si ya existe
  const old = element.querySelector('svg.note-bg');
  if (old) old.remove();

  wrapper.appendChild(node);
  element.prepend(wrapper);
}
