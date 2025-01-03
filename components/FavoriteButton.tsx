import useCustomNavigation from "hooks/useCustomNavigation";
import { CSSProperties } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Button } from "react-native";
import {
  FIRESTORE_FAVORITES_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";
import { Stats } from "types/stats";
import { FIREBASE_AUTH } from "utils/firebaseConfig";
import { DEFAULT_BUTTON_DIMENSIONS } from "utils/stringUtils";

import LabelButton from "./buttons/LabelButton";

interface FavoriteButtonProps {
  stats: Stats;
}

const ICON_STYLE: CSSProperties = {
  width: DEFAULT_BUTTON_DIMENSIONS,
  height: DEFAULT_BUTTON_DIMENSIONS,
  color: "#fff",
};

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { navigate } = useCustomNavigation();
  const { currentUser } = FIREBASE_AUTH;

  const { stats } = props;

  let updatedFavorites = stats?.favoriteWordIndexes! || [];

  const isFavorite = () => updatedFavorites.includes(stats?.selectedWordIndex!);

  const handleFavoriteClick = () => {
    !isFavorite()
      ? updatedFavorites.push(stats?.selectedWordIndex!)
      : (updatedFavorites = updatedFavorites.filter(
          (index) => index !== stats?.selectedWordIndex!,
        ));

    firestoreServices
      .updateCollection(
        currentUser?.uid!,
        FIRESTORE_FAVORITES_COLLECTION_NAME,
        { favorites: updatedFavorites },
      )
      .then(() => navigate("Home"));
  };

  return (
    <LabelButton
      label={!isFavorite() ? "Favoritar" : "Desfavoritar"}
      onPress={handleFavoriteClick}
      icon={
        !isFavorite() ? (
          <MdFavorite style={ICON_STYLE} />
        ) : (
          <MdFavoriteBorder style={ICON_STYLE} />
        )
      }
    />
  );
};

export default FavoriteButton;
