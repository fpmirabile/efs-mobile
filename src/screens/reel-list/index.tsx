import * as React from "react";
import ReelsController, { Props as ReelsProps } from "./controller";
import reelApi from "../../api/models/reels";

export default function RegisterModule(props: ReelsProps) {
  return <ReelsController {...props} 
  //onGetGroups={reelApi.getAllGroups} onGetReelsByGroup={reelApi.getReelsByGroup} onGetPopularReels={reelApi.getPopularReelsByGroup}
  />;
}
