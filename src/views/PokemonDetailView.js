import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import usePokemonDetail from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import AppButton from '../components/AppButton';
import { EmptyView, ErrorView, LoadingView } from '../components/StatusViews';
import { colors } from '../constants/theme';
import { capitalize, describeError, formatDecimal, formatPokemonId } from '../utils/helpers';

export default function PokemonDetailView({ idOrName, onBack }) {
  const { pokemon, loading, error, notFound, retry } = usePokemonDetail(idOrName);

  // UI STATE: loading
  if (loading) return <LoadingView message="Cargando ficha..." />;

  // UI STATE: no results (the name or number does not exist)
  if (notFound) {
    return (
      <EmptyView
        message={`No encontramos ningún Pokémon con "${idOrName}". Revisa el nombre o el número e intenta de nuevo.`}
        onBack={onBack}
      />
    );
  }

  // UI STATE: error
  if (error) return <ErrorView message={describeError(error)} onRetry={retry} onBack={onBack} />;

  // UI STATE: success
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        {/* CONCEPT: remote Image with explicit width and height */}
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <View style={styles.measure}>
            <Text style={styles.measureValue}>{formatDecimal(pokemon.height)} m</Text>
            <Text style={styles.measureLabel}>Altura</Text>
          </View>
          <View style={styles.measure}>
            <Text style={styles.measureValue}>{formatDecimal(pokemon.weight)} kg</Text>
            <Text style={styles.measureLabel}>Peso</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </View>

      <AppButton title="Volver a la lista" onPress={onBack} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 12, paddingBottom: 40 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: 240, height: 240, alignSelf: 'center' },
  number: { textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.textMuted },
  name: { textAlign: 'center', fontSize: 32, fontWeight: '900', color: colors.text },
  types: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  measures: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 18 },
  measure: { alignItems: 'center' },
  measureValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  measureLabel: { fontSize: 14, color: colors.textMuted },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 8 },
});
