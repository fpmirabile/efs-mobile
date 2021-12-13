import * as React from "react";
import { BasicStackComponentProps } from "../../../types";
import OnboardingView from "./onboarding-view";
export interface Props extends BasicStackComponentProps {}

const onboardingScreen = [
  {
    id: 1,
    title: "Contenido en base a tu experiencia",
    description: "En base a tu experiencia en ahorro e inversiones, te recomendaremos distintos contenidos que te ayudarán a convertirte en un experto",
    image: require("../../../assets/images/onboarding/im1.png")
  },
  {
    id: 2,
    title: "Todo a tu propio tiempo",
    description: "Sabemos que es difícil hacerse el tiempo para aprender cosas nuevas. Por eso, nuestros contenidos son de corta duración.",
    image: require("../../../assets/images/onboarding/img2.png")
  },
  {
    id:3,
    title: "Invertí tus FCS coins",
    description: "En nuestro simulador podrás invertir las FCS coins que vayas ganado a medida que aprendes nuevos conceptos.",
    image: require("../../../assets/images/onboarding/img3.png"),
  },
];
interface State {
  loading: boolean;
}

class OnboardingController extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
  };

  handleOnboarding = () => {
    const { navigation } = this.props;
    navigation.navigate("Login");
  };

  handleTouch = () => {
    const { navigation } = this.props;
    navigation.navigate("Login");
  };

  render() {
    const { loading } = this.state;
    return (
      <OnboardingView
        isLoading={loading}
        onPress={this.handleOnboarding}
        onTouch={this.handleTouch}
        onboardingScreen={onboardingScreen}
      />
    );
  }
}

export default OnboardingController;
