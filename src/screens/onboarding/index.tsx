import * as React from "react";
import OnboardingController, { Props as OnboardingProps } from "./controller";


export default function onboardingModule(props: OnboardingProps) {
  return (
    <OnboardingController
      {...props}
    />
  );
}
