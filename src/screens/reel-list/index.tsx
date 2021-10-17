import * as React from "react";
import ReelsController, { Props as ReelsProps} from "./controller";

export default function RegisterModule(props: ReelsProps) {
  return <ReelsController {...props} />;
}