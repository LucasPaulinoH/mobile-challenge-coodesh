import useCustomNavigation from "hooks/useCustomNavigation";
import { Button } from "react-native";
import {
  FIRESTORE_FAVORITES_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";
import { Stats } from "types/stats";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

interface FavoriteButtonProps {
  stats: Stats;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { navigate } = useCustomNavigation();
  const { currentUser } = FIREBASE_AUTH;

  const { stats } = props;

  let updatedFavorites = stats?.favoriteWordIndexes! || [];

  const isFavorite = () => updatedFavorites.includes(stats?.selectedWordIndex!);

  const handleFavoriteClick = () => {
    if (!isFavorite()) updatedFavorites.push(stats?.selectedWordIndex!);
    else
      updatedFavorites = updatedFavorites.filter(
        (index) => index !== stats?.selectedWordIndex!,
      );

    firestoreServices
      .updateCollection(
        currentUser?.uid!,
        FIRESTORE_FAVORITES_COLLECTION_NAME,
        { favorites: updatedFavorites },
      )
      .then(() => navigate("Home"));
  };

  return (
    <Button
      title={!isFavorite() ? "Favoritar" : "Desfavoritar"}
      onPress={handleFavoriteClick}
    />
  );
};

export default FavoriteButton;
