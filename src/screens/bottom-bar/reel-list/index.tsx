import * as React from "react";
import ReelsController, { Props as ReelsProps } from "./controller";
import reelApi from "../../../api/models/reels";
import { getUserData } from "../../../api/session";
import { User } from "../../../api/models/user";

export default function ReelListModule(props: ReelsProps) {
  const [userData, setUserData] = React.useState<User>();

  React.useEffect(() => {
    const loadUserData = async () => {
      const user = await getUserData();
      if (!user) {
        props.navigation.push('Root');
        return;
      }

      setUserData(user);
    }

    loadUserData();
  });

  return (
    <ReelsController
      {...props}
      onGetGroups={reelApi.getAllGroups}
      onGetReelsByGroup={reelApi.getSectionWithReelsByGroup}
      onGetPopularReels={reelApi.getPopularReelsByGroup}
      onFavoriteReel={reelApi.favoriteReel}
      onLikeReel={reelApi.likeReel}
      currentUser={userData}
    />
  );
}
