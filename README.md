# Weather Reporter
Weather Reporter is a web app that uses the Open Weather Map API to display weather forecast data. This is a GA lab assignment using Express and EJS to practice working with routes, gathering user data, and integrating API responses into the UI.

<img width="600" alt="weather-reporter-search" src="https://github.com/user-attachments/assets/a30f84bf-7853-4568-be82-396f159f5ffe" />
<img width="725" alt="weather-report" src="https://github.com/user-attachments/assets/8af0a167-4569-4262-8bd2-c7b8b755bb8b" />

## Tech Stack
- JavaScript
- Node.js
- Express.js

## Requirements
- Create a form that collects the zip code from the user.
  - The form should have an input field for the zip code and a submit button.
  - Ensure the form submits a `POST` request to the `/weather` route.
- Use the zip code and API key to make a request to the Open Weather Map API.
- Redirect to the `/weather/show` route with the weather data
- Create a new file `views/weather/show.ejs` In this template, display:
  - The name of the city.
  - The current temperature.
  - The current weather description.
  - A link with the text `Back to home!` that points to the route /.

## Stretch Goals
- Add a five day forecast with their 5 day forecast endpoint (completed)
- Include sunrise and sunset times (completed)
- CSS for styling 
