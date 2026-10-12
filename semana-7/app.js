import { personajes } from './datos.js';
import { filtrarPersonajes } from './logica.js';

// --- Estados: la clave es el valor EXACTO que trae la API (status) ---
const ESTADOS = {
  Alive:   { texto: 'Vivo',        clases: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  Dead:    { texto: 'Muerto',      clases: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
  unknown: { texto: 'Desconocido', clases: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
};
// Si llega un status que no está en ESTADOS, la tarjeta igual se ve
const estadoDe = (p) =>
  ESTADOS[p.status] ?? { texto: p.status || 'Sin dato', clases: ESTADOS.unknown.clases };

// --- Referencias al DOM ---
const grilla = document.getElementById('grilla');
const contador = document.getElementById('contador');
const formulario = document.getElementById('formulario');
const inputBusqueda = document.getElementById('busqueda');
const selectEstado = document.getElementById('filtro-estado');

// --- Estado de la aplicación: los dos filtros viven en un solo objeto ---
const filtros = { texto: '', estado: '' };

// --- Plantillas ---
const tarjetaHTML = (p) => {
  const estado = estadoDe(p);
  return `
  <article class="flex flex-col overflow-hidden rounded-2xl bg-white shadow group transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
    <div class="overflow-hidden">
      <img src="${p.image}" alt="${p.name}"
          class="aspect-square w-full object-cover transition group-hover:scale-105">
    </div>
    <div class="flex flex-1 flex-col gap-2 p-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">${p.name}</h3>
      <span class="w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${estado.clases}">● ${estado.texto}</span>
      <p class="text-sm text-slate-500 dark:text-slate-400">${p.species} · ${p.origin.name}</p>
      <button type="button" data-id="${p.id}"
              class="mt-auto rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Ver detalle
      </button>
    </div>
  </article>`;
};

const vacioHTML = `
  <p class="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500 shadow dark:bg-slate-800 dark:text-slate-400">
    No se encontró ningún personaje con esos filtros. Prueba con otro nombre o borra el filtro de estado.
  </p>`;

// --- render: lee los filtros, filtra, pinta la grilla y actualiza el contador ---
const render = () => {
  const visibles = filtrarPersonajes(personajes, filtros);
  contador.textContent = `${visibles.length} de ${personajes.length} personajes`;
  grilla.innerHTML = visibles.length === 0 ? vacioHTML : visibles.map(tarjetaHTML).join('');
};

// --- Buscador y filtro ---
// 'input' se dispara al escribir y también al borrar con la ✕ del campo de búsqueda
inputBusqueda.addEventListener('input', () => {
  filtros.texto = inputBusqueda.value;
  render();
});
selectEstado.addEventListener('change', () => {
  filtros.estado = selectEstado.value;
  render();
});
// Enter dentro del formulario no debe recargar la página
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
});

// --- Modal con delegación: UN listener en la grilla, sirve para tarjetas que aún no existen ---
const modal = document.getElementById('modal-detalle');
grilla.addEventListener('click', (e) => {
  const boton = e.target.closest('button[data-id]');   // clic en imagen o en el espacio entre tarjetas → null
  if (!boton) return;
  const p = personajes.find((x) => x.id === Number(boton.dataset.id));   // dataset siempre es texto
  if (!p) return;
  document.getElementById('modal-nombre').textContent = p.name;
  document.getElementById('modal-img').src = p.image;
  document.getElementById('modal-img').alt = p.name;
  document.getElementById('modal-estado').textContent = estadoDe(p).texto;
  document.getElementById('modal-especie').textContent = p.species;
  document.getElementById('modal-origen').textContent = p.origin.name;
  document.getElementById('modal-ubicacion').textContent = p.location.name;
  modal.showModal();   // fondo oscuro + Esc + foco atrapado, gratis
});
// Clic en el fondo oscuro: el target es el propio <dialog>, no algo de adentro
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

// --- Menú móvil: mostrar/ocultar y avisar al lector de pantalla (el único lugar con este código) ---
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');
btnMenu.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  btnMenu.setAttribute('aria-expanded', !menu.classList.contains('hidden'));
});

// --- Primer pintado ---
render();
