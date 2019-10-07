# Daily Vessel tracks

## Description

> This application presents daily vessel tracks on a map and animates them.
> It consumes dataset from the Marine Traffic API.
> Documentation on the API can be found [here](https://www.marinetraffic.com/en/ais-api-services/documentation/api-service:ps01).
>
>**The app uses:**
>* Leaflet Library
>* Waypoints with informational tooltips
>* Location clustering

## Instructions for running locally

- clone repo

```
git clone https://github.com/ManosChr/Frontend-Assignment.git
```

- cd to repo folder

```
cd Frontend-Assignment
```

- run index.html



## Specifications

- User enters a Number Of Ships that he wants to be shown on the map. An array of ids [1,..,numberOfShips] will be tested if they exist on the API and then they will be shown on the map
- User enters a Number Of Previous Days for which each ship's location will be designated on the map and its course will be drawn as well
- Press the SEARCH button to start the proccess and retrieve data from the API
- Press the CLEAR button to clear all vessels from the map, as well as their former days routes

## Improvements and new features to be added

- [ ] Display direction and speed of vessel with animations
- [ ] Add live preview functionality
- [ ] Prepare distribution app for production (Babel, Webpack)
