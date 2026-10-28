import { useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import usePokemonList from '../hooks/usePokemonList';
import PokemonCard from '../components/PokemonCard';
import AppButton from '../components/AppButton';
import { ErrorView, LoadingView } from '../components/StatusViews';
import { colors } from '../constants/theme';
import { describeError } from '../utils/helpers';

export default function PokemonListView({ onSelect }) {
  const [query, setQuery] = useState('');
  const { pokemon, loading, loadingMore, error, hasMore, loadMore } = usePokemonList();

  const handleSearch = () => {
    const term = query.trim().toLowerCase(); // ignore case and outer spaces
    if (!term) return;
    Keyboard.dismiss();
    onSelect(term); // the detail view fetches it and handles "not found"
  };

  // Footer of the list: spinner while loading more, retry if that request failed.
  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.footerText}>Cargando más Pokémon...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{describeError(error)}</Text>
          <AppButton title="Reintentar" onPress={loadMore} style={styles.retry} />
        </View>
      );
    }
    if (!hasMore) return <Text style={styles.footerText}>Llegaste al final de la lista</Text>;
    return null;
  };

  const renderBody = () => {
    // UI STATE: loading (first page)
    if (loading) return <LoadingView message="Cargando Pokémon..." />;
    // UI STATE: error (nothing loaded yet)
    if (error && pokemon.length === 0) {
      return <ErrorView message={describeError(error)} onRetry={loadMore} />;
    }
    // UI STATE: success
    return (
      // CONCEPT: FlatList (numColumns, keyExtractor, onEndReached) instead of ScrollView + map
      <FlatList
        data={pokemon}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => onSelect(item.id)} />}
        onEndReached={error ? undefined : loadMore} // infinite scroll (paused while there is an error)
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Busca por nombre o número..."
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <AppButton title="Buscar" onPress={handleSearch} />
      </View>
      {renderBody()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: colors.text,
  },
  row: { justifyContent: 'space-between' },
  listContent: { paddingHorizontal: 12, paddingBottom: 32 },
  footer: { alignItems: 'center', paddingVertical: 16 },
  footerText: { color: colors.textMuted, textAlign: 'center', marginTop: 8 },
  retry: { marginTop: 12 },
});
