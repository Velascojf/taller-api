import { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// CONCEPT: SafeAreaView — keeps content away from notches and system bars
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PokemonListView from './src/views/PokemonListView';
import PokemonDetailView from './src/views/PokemonDetailView';
import { colors } from './src/constants/theme';

export default function App() {
  // CONCEPT: useState — which Pokémon is open (null means "show the list")
  const [selected, setSelected] = useState(null);

  // CONCEPT: useEffect with dependencies — the listener is re-created only when `selected` changes
  useEffect(() => {
    if (selected === null) return; // on the list view, let Android close the app
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setSelected(null);
      return true;
    });
    return () => subscription.remove(); // cleanup
  }, [selected]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.title}>PokéDex Explorer</Text>
        </View>

        <View style={styles.content}>
          {/* The list stays mounted (only hidden) so the loaded pages, the scroll
              position and the search text are kept when the user comes back. */}
          <View style={[styles.fill, selected !== null && styles.hidden]}>
            <PokemonListView onSelect={setSelected} />
          </View>

          {selected !== null && (
            <PokemonDetailView idOrName={selected} onBack={() => setSelected(null)} />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// CONCEPT: StyleSheet
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  header: { backgroundColor: colors.primary, paddingVertical: 14, alignItems: 'center' },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', letterSpacing: 0.5 },
  content: { flex: 1, backgroundColor: colors.background },
  fill: { flex: 1 },
  hidden: { display: 'none' },
});
