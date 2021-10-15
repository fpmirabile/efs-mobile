# efs-mobile

## Installation

### Important
You will need to use [Node12](https://nodejs.org/es/download/) or greater
You will need to install [watchmen](https://facebook.github.io/watchman/docs/install.html) in case you are on a MacOS.

1. Do a `npm install` before everything
2. Run `npm start` and you should see the expo page in your default browser
    a. Be careful, if you see the next message:
    ```This command requires Expo CLI. Do you want to install it globally [Y/n]?```
    That means that you will need to install globally expo cli. Just write Y and press enter and npm should handle the installation.
    b. For iOS folks: you will need to run `expo send` instead of `npm start`. This is basically because iOS doesn't allow expo to use the QR. This method will ask you an email so they can send to you the url (you must be registered on expo).
3. To run inside your device: 
    You will need to download `Expo` app from your app store (or play store).
    Then scan the QR code in the expo browser page, and that's it all!


## Troubleshooting

For issues connecting Expo to your local computer: [Link](https://docs.expo.dev/guides/testing-on-devices/)
