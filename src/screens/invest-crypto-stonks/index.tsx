import * as React from "react";
import { User } from "../../api/models/user";
import { getUserData } from "../../api/session";
import Controller, { PropTypes as ControllerProps } from "./controller";

interface PropTypes extends ControllerProps {}

export default function InvestCryptoStonksModule(props: PropTypes) {
  const [user, setUser] = React.useState<User>();

  const getUser = async () => {
    const user = await getUserData();
    if (!user) {
      return;
    }

    setUser(user);
  };

  React.useEffect(() => {
    getUser();
  });

  return (
    <Controller
      {...props}
      myInvestments={user?.simulatorData}
      userCoins={user?.monedas || 0}
      reloadUserInvestments={getUser}
    />
  );
}
