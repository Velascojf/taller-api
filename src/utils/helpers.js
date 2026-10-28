// Small pure functions (no React, no network).

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// 25 -> "#025"
export const formatPokemonId = (id) => `#${String(id).padStart(3, '0')}`;

// 0.4 -> "0,4"
export const formatDecimal = (value) => value.toFixed(1).replace('.', ',');

// Turns any error thrown by the API layer into a clear message in Spanish.
export function describeError(error) {
  if (error?.code === 'HTTP_ERROR') {
    return `El servidor respondió con un error (código ${error.status}). Intenta de nuevo en unos segundos.`;
  }
  return 'No se pudo conectar con la PokéAPI. Revisa tu conexión a internet e intenta de nuevo.';
}
