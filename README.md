# News Mobile Application
## Overview
This project is a news application that fetches news data from an external API and displays it in a list format. It uses Redux for state management and redux-persist to store news data locally, providing offline functionality.



## Setup Instructions

- Node.js (version 14 or higher)
- npm or yarn

## Installation Steps

- Clone the repository: git clone https://github.com/vishalgupta8982/News-Mobile-Application
- Install dependencies: npm install

## Start the application

npx react-native run-android

# API Configuration Steps
- Get API Key: To fetch news data, you'll need an API key from https://newsapi.org/
- Configure API Key: In the ApiKey.ts file replace 'API_KEY' with your actual API key:
 
# Key Implementation Notes
## Redux and Redux Persist
- State Management with Redux:
The application uses Redux to manage the state of the news data. The newsSlice.js file manages actions and reducers related to news, including fetching and storing news articles.
- Persistence with Redux-Persist:
We use redux-persist to persist the news data locally in AsyncStorage. This allows the app to retain news data even when the app is restarted or when the device goes offline.
- he app uses @react-native-community/netinfo to listen for changes in network connectivity. When the app is offline, it will display previously fetched news. Once the device reconnects to the internet, it will fetch fresh news data.
