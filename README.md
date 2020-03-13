# OmniStack8
OmniStack8 week held on 2019-09-30
## Tindev
## What is the project
Tindev is an application similar to Tinder, created to find other developers who work on the same stack or share the same experiences. The developers will be searched through GitHub and registered in the application's database if they do not exist.
## Main features
## - Login
This screen is responsible for controlling the user's access to the system, it is the first that is displayed. Inform your GitHub user to have access to all registered users. If it is the first time you are logging in, it will be registered and stored in the database.
## Web app
<p align="center">
  <img width="600" height="300" src="https://github.com/borges2/OmniStack8/blob/master/image/LoginWeb.png">
</p>

## Mobile app
<p align="center">
  <img width="200" height="300" src="https://github.com/borges2/OmniStack8/blob/master/image/LoginMobile.png">
</p>

## - Main page (Like/Dislike)
This screen is the main one where all the github users registered in the application are listed. The logged in user has the option to give (like) or (dislike) the desired user of the listing via the button below the profile. After pressing the button, the chosen user will be removed from the list of the logged in user. If you have chosen the option (like) and that same user has given (like) the logged in user, a screen will appear with the avatar (image) and the message (match) of the chosen user.
## Web app
<p align="center">
  <img width="600" height="300" src="https://github.com/borges2/OmniStack8/blob/master/image/InterfaceWeb.png">
</p>

## Mobile app
<p align="center">
  <img width="200" height="300" src="https://github.com/borges2/OmniStack8/blob/master/image/InterfaceMobile.png">
</p>

## How to run it
Do the following steps:
Open a terminal in administrator mode, enter the backend folder and run the command: yarn dev.
To run the web application frontend, open a terminal in administrator mode, enter the frontend folder and run the command: yarn start.
## How to run it mode (Android)
Do the following steps:
Access the link: (https://docs.rocketseat.dev/ambiente-react-native/introducao) and install all necessary dependencies.
After the android environment is ready to test applications, enter the folder: (tindev/android/app/build/intermediates) and delete the folder (signing_config). This file has restricted permissions to run the application.
### Install the following modules into the tindev folder:
yarn add react-navigation react-native-gesture-handler react-native-reanimated<br/>
yarn add axios<br/>
yarn add @react-native-community/async-storage<br/>

Connect the phone via usb to the pc. With the device connected, it must have USB debugging enabled. In the usb configuration, you need to leave the MIDI option enabled.<br/>
Open the terminal prompt and run the adb devices command. If everything is correct, the connected device id will appear.<br/>
Open a terminal in administrator mode, enter the backend folder and run the command: yarn dev. <br/>
Open a terminal in administrator mode, enter the tindev folder and run the command: yarn react-native run-android. Wait for the application to be installed on your device. <br/>
## Emulating via Wi-Fi
After following the previous steps via usb, open the terminal prompt and run the ipconfig command. The result should be a list that contains the IP of the pc on the network. Open the application installed on the phone, then shake the device to open the Developer Menu, with it open select the option Dev Settings, within the settings select the option Debug server host & port for device.
Enter the IP of the pc that was obtained previously, followed by port 8081. Example: 10.0.1.1:8081.
After that, go back to the application screen and disconnect the usb cable. Open the Developer Menu by shaking the device and run the Reload option. <br/>
Enter the Tindev project folder, look for the services folder inside the src folder, open the api.js. Change the line (baseURL: 'http://192.168.0.110:3333') to the pc's ip found through the ipconfig command.
Look for the pages folder inside the src folder, open the Main.js file. Change the line (const socket = io ('http://192.168.0.110:3333', {query: {user: id}})) to the pc's ip found using the ipconfig command. <br/>
Open the terminal prompt in administrator mode, enter the tindev folder and run the command: yarn start. At this point, the application should be working correctly.
