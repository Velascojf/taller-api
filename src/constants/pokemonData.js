// Static data used to present what the API returns (type colors and Spanish labels).

export const MAX_BASE_STAT = 255; // maximum possible base stat, used for the bar width

// `darkText: true` is used on light backgrounds so the label stays readable.
export const TYPE_INFO = {
  normal: { label: 'Normal', color: '#A8A77A' },
  fire: { label: 'Fuego', color: '#EE8130' },
  water: { label: 'Agua', color: '#6390F0' },
  electric: { label: 'Eléctrico', color: '#F7D02C', darkText: true },
  grass: { label: 'Planta', color: '#7AC74C' },
  ice: { label: 'Hielo', color: '#96D9D6', darkText: true },
  fighting: { label: 'Lucha', color: '#C22E28' },
  poison: { label: 'Veneno', color: '#A33EA1' },
  ground: { label: 'Tierra', color: '#E2BF65', darkText: true },
  flying: { label: 'Volador', color: '#A98FF3' },
  psychic: { label: 'Psíquico', color: '#F95587' },
  bug: { label: 'Bicho', color: '#A6B91A' },
  rock: { label: 'Roca', color: '#B6A136' },
  ghost: { label: 'Fantasma', color: '#735797' },
  dragon: { label: 'Dragón', color: '#6F35FC' },
  dark: { label: 'Siniestro', color: '#705746' },
  steel: { label: 'Acero', color: '#B7B7CE', darkText: true },
  fairy: { label: 'Hada', color: '#D685AD' },
};

export const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidad',
};
