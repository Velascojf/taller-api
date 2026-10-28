import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export default function AppButton({ title, onPress, variant = 'primary', style }) {
  const isSecondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isSecondary && styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, isSecondary && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.primary },
  pressed: { opacity: 0.75 },
  text: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryText: { color: colors.primary },
});
