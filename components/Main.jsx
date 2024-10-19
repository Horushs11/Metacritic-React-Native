import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { ActivityIndicator } from "react-native";
import { Logo } from "./Logo";

// import icon from './assets/icon.png'; Se puede tanto importar como crear una constante con el require

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 10, marginTop: 10, alignItems: "center" }}>
        <Logo></Logo>
      </View>
      {games.length === 0 ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index}></AnimatedGameCard>
          )}
        />
      )}
    </View>
  );
}
