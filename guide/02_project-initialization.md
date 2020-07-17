# Expo or plain React Native

## You must use Expo if:
- You are using Windows/Linux, but want to use an iPhone to run your app
- You just want to try out React Native, but don't want to spend much time on setup
- One thing to note if you're using Expo and you're using the Expo app, is that you have to make sure you're on the same Wi Fi network as your computer because basically the JavaScript bundle that's being built, is being sent to your phone using WiFi

## You should use plain React Native if:
- You have time and interest in setting up the native development environment (can take quite a few hours depending on your operating system and environment)

# Getting started with expo

## Install the Expo CLI command line utility
```sh
npm install -g expo-cli
```

## Creating a new project
```sh
expo init rn-expo-app
```

## Run the app
```sh
npm start 
or 
expo start
```