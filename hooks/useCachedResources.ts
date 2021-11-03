import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'redhatdisplay-bold': require('../assets/fonts/RedHatDisplay-Bold.ttf'),
          'redhatdisplay-bolditalic': require('../assets/fonts/RedHatDisplay-BoldItalic.ttf'),
          'redhatdisplay-extrabold': require('../assets/fonts/RedHatDisplay-ExtraBold.ttf'),
          'redhatdisplay-italic': require('../assets/fonts/RedHatDisplay-Italic.ttf'),
          'redhatdisplay-light': require('../assets/fonts/RedHatDisplay-Light.ttf'),
          'redhatdisplay-lightitalic': require('../assets/fonts/RedHatDisplay-LightItalic.ttf'),
          'redhatdisplay-medium': require('../assets/fonts/RedHatDisplay-Medium.ttf'),
          'redhatdisplay-mediumitalic': require('../assets/fonts/RedHatDisplay-MediumItalic.ttf'),
          'redhatdisplay-regular': require('../assets/fonts/RedHatDisplay-Regular.ttf'),
          'redhatdisplay-semibold': require('../assets/fonts/RedHatDisplay-SemiBold.ttf'),
          'redhatdisplay-semibolditalic': require('../assets/fonts/RedHatDisplay-SemiBoldItalic.ttf'),
          'redhatdisplay-black': require('../assets/fonts/RedHatDisplay-Black.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
