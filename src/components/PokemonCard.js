import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';
import { capitalize, formatPokemonId } from '../utils/helpers';

export default function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver ${capitalize(pokemon.name)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* CONCEPT: remote Image needs explicit width and height */}
      <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {capitalize(pokemon.name)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: { opacity: 0.7 },
  image: { width: 110, height: 110 },
  number: { marginTop: 6, fontSize: 13, fontWeight: '700', color: colors.textMuted },
  name: { fontSize: 17, fontWeight: '800', color: colors.text },
});
