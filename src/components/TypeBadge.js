import { StyleSheet, Text, View } from 'react-native';
import { TYPE_INFO } from '../constants/pokemonData';
import { capitalize } from '../utils/helpers';

export default function TypeBadge({ type }) {
  // Unknown types still render with a neutral color instead of crashing.
  const info = TYPE_INFO[type] ?? { label: capitalize(type), color: '#6B7280' };
  return (
    <View style={[styles.badge, { backgroundColor: info.color }]}>
      <Text style={[styles.text, info.darkText && styles.darkText]}>{info.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 999, marginHorizontal: 4 },
  text: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  darkText: { color: '#1F2937' },
});
