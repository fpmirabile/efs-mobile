import * as React from "react";
import { User } from "../../../api/models/user";
import { getUserData } from "../../../api/session";
import Controller, { PropTypes as SimulatorProps } from "./controller";

export default function Simulator(props: SimulatorProps) {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const getUserInformation = async () => {
      const userInfo = await getUserData();
      if (!userInfo) {
        props.navigation.push("Root");
        return;
      }

      setUser(userInfo);
    };

    getUserInformation();
  });

  return <Controller {...props} currentUser={user} />;
}
