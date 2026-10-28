// API layer: the ONLY file that talks to the network.
// It returns clean objects, so components never see the raw API response.

const BASE_URL = 'https://pokeapi.co/api/v2';
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const PAGE_SIZE = 20;

export const getArtworkUrl = (id) => `${ARTWORK_URL}/${id}.png`;

function createApiError(code, message, status) {
  const error = new Error(message);
  error.code = code; // 'NOT_FOUND' | 'HTTP_ERROR'
  error.status = status;
  return error;
}

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
const extractId = (url) => Number(url.split('/').filter(Boolean).pop());

// CONCEPT: fetch + async/await — paginated list
export async function fetchPokemonPage(offset = 0, limit = PAGE_SIZE) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  // CONCEPT: check response.ok BEFORE calling response.json()
  if (!response.ok) throw createApiError('HTTP_ERROR', 'Request failed', response.status);

  const data = await response.json();
  return {
    hasMore: data.next !== null,
    items: data.results.map(({ name, url }) => {
      const id = extractId(url); // the list only gives name + url
      return { id, name, image: getArtworkUrl(id) };
    }),
  };
}

// Search accepts a name or a number, ignoring case, outer spaces and a leading "#".
function normalizeSearch(term) {
  const clean = String(term).trim().toLowerCase().replace(/^#/, '').replace(/\s+/g, '-');
  return /^\d+$/.test(clean) ? String(Number(clean)) : clean; // "025" -> "25"
}

// CONCEPT: fetch + async/await — one Pokémon (by name or id)
export async function fetchPokemonDetail(idOrName) {
  const response = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(normalizeSearch(idOrName))}`);

  // CONCEPT: a missing name answers 404 with plain text, not JSON
  if (response.status === 404) throw createApiError('NOT_FOUND', 'Pokémon not found', 404);
  if (!response.ok) throw createApiError('HTTP_ERROR', 'Request failed', response.status);

  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    height: data.height / 10, // decimeters -> meters
    weight: data.weight / 10, // hectograms -> kilograms
    image: data.sprites?.other?.['official-artwork']?.front_default ?? getArtworkUrl(data.id),
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
  };
}
