import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AppButton from './AppButton';
import { colors } from '../constants/theme';

// UI STATE: loading
export function LoadingView({ message }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// UI STATE: error (clear message + "Reintentar")
export function ErrorView({ message, onRetry, onBack }) {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.heading}>Algo salió mal</Text>
      <Text style={styles.message}>{message}</Text>
      <AppButton title="Reintentar" onPress={onRetry} style={styles.button} />
      {onBack && (
        <AppButton title="Volver a la lista" variant="secondary" onPress={onBack} style={styles.button} />
      )}
    </View>
  );
}

// UI STATE: empty / no results
export function EmptyView({ message, onBack }) {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>🔍</Text>
      <Text style={styles.heading}>Sin resultados</Text>
      <Text style={styles.message}>{message}</Text>
      {onBack && <AppButton title="Volver a la lista" onPress={onBack} style={styles.button} />}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 44, marginBottom: 8 },
  heading: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 6 },
  message: { fontSize: 16, color: colors.textMuted, textAlign: 'center', marginTop: 10 },
  button: { marginTop: 16, minWidth: 200 },
});
