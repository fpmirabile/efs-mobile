import * as React from "react";
import ProfileController, { Props as ProfileProps } from "./controller";
import { getsurveyQuestions } from "../../util/profile";

export default function ProfileModule(props: ProfileProps) {
  return (
    <ProfileController
      {...props}
      onGetSurveyQuestions={getsurveyQuestions}
    />
  );
}