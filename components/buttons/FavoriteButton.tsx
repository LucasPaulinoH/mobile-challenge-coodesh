import useCustomNavigation from "hooks/useCustomNavigation";
import { CSSProperties } from "react";
import { Button } from "react-native";
import { Icon } from "react-native-eva-icons";
import {
  FIRESTORE_FAVORITES_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";
import { Stats } from "types/stats";
import { FIREBASE_AUTH } from "utils/firebaseConfig";
import { DEFAULT_BUTTON_DIMENSIONS } from "utils/stringUtils";

import LabelButton from "./LabelButton";

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
      label={!isFavorite() ? "Favorite" : "Unfavorite"}
      onPress={handleFavoriteClick}
      icon={
        !isFavorite() ? (
          <Icon
            name="heart"
            width={DEFAULT_BUTTON_DIMENSIONS}
            height={DEFAULT_BUTTON_DIMENSIONS}
            fill="#fff"
          />
        ) : (
          <Icon
            name="heart-outline"
            width={DEFAULT_BUTTON_DIMENSIONS}
            height={DEFAULT_BUTTON_DIMENSIONS}
            fill="#fff"
          />
        )
      }
    />
  );
};

export default FavoriteButton;
