import * as React from "react";
import ReelsController, { Props as ReelsProps } from "./controller";
import reelApi from "../../../api/models/reels";

export default function ReelListModule(props: ReelsProps) {
  return (
    <ReelsController
      {...props}
      onGetGroups={reelApi.getAllGroups}
      onGetReelsByGroup={reelApi.getSectionWithReelsByGroup}
      onGetPopularReels={reelApi.getPopularReelsByGroup}
      onFavoriteReel={reelApi.favoriteReel}
      onLikeReel={reelApi.likeReel}
    />
  );
}
