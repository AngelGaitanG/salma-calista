export type StoryBlockType = 'subtitle' | 'paragraph' | 'quote' | 'image';

export interface StoryBlock {
  type: StoryBlockType;
  text?: string;      // para subtítulo, párrafo o cita
  src?: string;       // para imagen
  alt?: string;       // texto alternativo de imagen
  isExpanded?: boolean; // para controlar el estado del dropdown
}

export interface Story {
  id?: string;
  title: string;
  subtitle?: string;
  content: StoryBlock[];
}


export const stories: Story[] = [
  {
    title: "Un café bajo la lluvia",
    subtitle: "El día que aprendí a disfrutar lo simple",
    content: [
      { type: "paragraph", text: "Era una tarde fría, la lluvia golpeaba el vidrio de la cafetería. Yo estaba solo, con un café caliente en las manos y la sensación de que la vida iba demasiado rápido." },
      { type: "quote", text: "Ese día descubrí que la calma también es un logro." },
      { type: "image", src: "https://picsum.photos/seed/cafe/800/600", alt: "Una taza de café junto a la ventana en un día lluvioso" },
    ],
  },
  {
    title: "El reencuentro inesperado",
    subtitle:  "Cuando el pasado toca la puerta",
    content: [
      { type: "paragraph", text: "En una caminata cualquiera, me crucé con un viejo amigo de la infancia. Años sin vernos, pero bastó una sonrisa para que todo pareciera como antes." },
      { type: "quote", text: "Algunas amistades no necesitan tiempo, solo un momento para renacer." },
      { type: "image", src: "https://picsum.photos/seed/reencuentro/800/600", alt: "Dos amigos abrazándose en la calle" },
    ],
  },
  {
    title: "La primera vez que viajé solo",
    subtitle: "El miedo y la libertad",
    content: [
      { type: "paragraph", text: "Tenía la mochila lista y un boleto en la mano. El tren partió y con él también mis inseguridades. Descubrí que viajar solo no es estar en soledad, sino encontrarse con uno mismo." },
      { type: "quote", text: "La libertad no pesa, pero enseña a cargar solo con lo esencial." },
      { type: "image", src: "https://picsum.photos/seed/viaje/800/600", alt: "Una mochila frente a un tren en movimiento" },
    ],
  },
  {
    title: "El consejo de mi abuela",
    subtitle: "Palabras que nunca se olvidan",
    content: [
      { type: "paragraph", text: "Sentados en la mesa, mientras preparaba su receta de siempre, me miró y me dijo: 'Haz las cosas con amor, y aunque no salgan perfectas, valdrán la pena'." },
      { type: "quote", text: "El amor es el ingrediente secreto de todo lo que vale la pena." },
      { type: "image", src: "https://picsum.photos/seed/abuela/800/600", alt: "Manos de una abuela amasando pan" },
    ],
  },
  {
  title: "El Viaje de Clara",
  subtitle: "Un camino de descubrimiento personal",
  content: [
    {
      type: "paragraph",
      text: "Clara siempre había vivido en la misma ciudad, rodeada de las mismas calles, los mismos cafés y los mismos rostros que la acompañaban desde la infancia. Su vida estaba marcada por la rutina, una especie de seguridad que, aunque cómoda, comenzaba a pesarle como una cadena invisible."
    },
    {
      type: "paragraph",
      text: "Cada mañana, mientras caminaba hacia el trabajo, miraba con cierta envidia a los turistas que descubrían con ojos brillantes rincones que para ella ya eran parte del paisaje. En el fondo de su corazón, Clara sabía que necesitaba cambiar, romper el ciclo que la mantenía atrapada en la monotonía."
    },
    {
      type: "subtitle",
      text: "El día de la decisión"
    },
    {
      type: "paragraph",
      text: "Una tarde lluviosa, mientras hojeaba un viejo cuaderno de notas, Clara encontró una lista de sueños que había escrito cuando tenía veinte años. Entre ellos estaba: 'viajar sola a un lugar desconocido'. El papel estaba amarillento, pero las letras aún conservaban la fuerza de sus anhelos juveniles. Ese hallazgo fue el impulso que necesitaba."
    },
    {
      type: "paragraph",
      text: "Sin pensarlo demasiado, buscó un destino en un mapa y eligió un pequeño pueblo costero del que nunca había oído hablar. Compró el boleto sin consultar a nadie, con la convicción de que debía enfrentarse a lo inesperado."
    },
    {
      type: "subtitle",
      text: "El viaje"
    },
    {
      type: "paragraph",
      text: "El tren partió temprano en la mañana. Clara miraba por la ventana cómo los paisajes cambiaban lentamente: edificios que se volvían campos verdes, y campos que se transformaban en montañas. Con cada kilómetro, sentía que algo dentro de ella también iba cambiando, como si se desprendiera de una piel vieja que ya no le pertenecía."
    },
    {
      type: "paragraph",
      text: "En el pueblo, la esperaba un mundo completamente distinto. Las calles empedradas, el olor a mar y la calma de los habitantes la envolvieron en una sensación de paz que jamás había experimentado. Por primera vez en años, Clara no sentía prisa por llegar a ningún lado."
    },
    {
      type: "subtitle",
      text: "El encuentro consigo misma"
    },
    {
      type: "paragraph",
      text: "Durante los días siguientes, Clara se dedicó a caminar sin rumbo, a conversar con desconocidos y a observar atardeceres desde la playa. Descubrió que podía disfrutar de su propia compañía, que el silencio no era vacío sino un espacio fértil donde nacían nuevas ideas y emociones."
    },
    {
      type: "paragraph",
      text: "Al final de su estancia, comprendió que el verdadero viaje no estaba en el lugar que había visitado, sino en el cambio que había ocurrido en su interior. Ya no era la misma mujer que había subido al tren. Había aprendido a escuchar sus propios deseos y a confiar en que tenía la fuerza para hacerlos realidad."
    },
    {
      type: "subtitle",
      text: "El regreso"
    },
    {
      type: "paragraph",
      text: "Cuando Clara volvió a su ciudad, las calles eran las mismas, pero ella las recorría con una mirada diferente. La rutina seguía allí, esperándola, pero ahora sabía que no estaba condenada a ella. El viaje le había dado la certeza de que siempre habría un nuevo comienzo si se atrevía a dar el primer paso."
    }
  ]
}

];