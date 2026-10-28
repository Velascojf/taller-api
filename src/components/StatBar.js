import { StyleSheet, Text, View } from 'react-native';
import { MAX_BASE_STAT, STAT_LABELS } from '../constants/pokemonData';
import { colors } from '../constants/theme';

const barColor = (value) => (value < 50 ? '#EF4444' : value < 90 ? '#F59E0B' : '#22C55E');

export default function StatBar({ name, value }) {
  // Bar width is proportional to the maximum possible value (255).
  const percent = Math.min(value / MAX_BASE_STAT, 1) * 100;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: barColor(value) }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  label: { width: 100, fontSize: 14, color: colors.textMuted, fontWeight: '600' },
  value: { width: 36, fontSize: 14, fontWeight: '800', color: colors.text },
  track: { flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});
