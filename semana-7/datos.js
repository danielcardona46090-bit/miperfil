// js/datos.js · cada objeto copia la forma de https://rickandmortyapi.com/api/character/{id}
// (solo los campos que mostramos; la API trae muchos más). Los nombres de propiedad y los
// valores de status son exactamente los de la API: 'Alive', 'Dead', 'unknown'.
const avatar = (id) => `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;

export const personajes = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human',
    origin: { name: 'Earth (C-137)' }, location: { name: 'Citadel of Ricks' }, image: avatar(1) },
  { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human',
    origin: { name: 'unknown' }, location: { name: 'Citadel of Ricks' }, image: avatar(2) },
  { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human',
    origin: { name: 'Earth (Replacement Dimension)' }, location: { name: 'Earth (Replacement Dimension)' }, image: avatar(3) },
  { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human',
    origin: { name: 'Earth (Replacement Dimension)' }, location: { name: 'Earth (Replacement Dimension)' }, image: avatar(4) },
  { id: 5, name: 'Jerry Smith', status: 'Alive', species: 'Human',
    origin: { name: 'Earth (Replacement Dimension)' }, location: { name: 'Earth (Replacement Dimension)' }, image: avatar(5) },
  { id: 6, name: 'Abadango Cluster Princess', status: 'Alive', species: 'Alien',
    origin: { name: 'Abadango' }, location: { name: 'Abadango' }, image: avatar(6) },
  { id: 7, name: 'Abradolf Lincler', status: 'unknown', species: 'Human (Genetic experiment)',
    origin: { name: 'Earth (Replacement Dimension)' }, location: { name: 'Testicle Monster Dimension' }, image: avatar(7) },
  { id: 8, name: 'Adjudicator Rick', status: 'Dead', species: 'Human',
    origin: { name: 'unknown' }, location: { name: 'Citadel of Ricks' }, image: avatar(8) },
  { id: 9, name: 'Agency Director', status: 'Dead', species: 'Human',
    origin: { name: 'Earth (Replacement Dimension)' }, location: { name: 'Earth (Replacement Dimension)' }, image: avatar(9) },
  { id: 10, name: 'Alan Rails', status: 'Dead', species: 'Human',
    origin: { name: 'unknown' }, location: { name: "Worldender's lair" }, image: avatar(10) },
];
