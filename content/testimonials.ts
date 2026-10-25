// Uniquement de vrais utilisateurs ayant donné leur accord écrit. Jamais de photo générée associée à un témoignage.

export type Testimonial = {
  name: string
  age: number
  quote: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Nirina',
    age: 45,
    quote:
      'TIA c’est top\u00a0! Explorer les profils en un coup d’œil, c’est bien plus malin que d’explorer à l’aveugle.',
  },
  {
    name: 'Andry',
    age: 32,
    quote:
      'Depuis que j’utilise TIA, l’IA me propose des profils vraiment pertinents. Ça change des matchs au hasard.',
  },
  {
    name: 'Hanta',
    age: 25,
    quote:
      'La vérification d’identité, c’est exactement ce qu’il manquait aux apps de rencontre à Madagascar.',
  },
]
