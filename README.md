# Weather Check

This is a simple weather web application built with Node.js, Express, and Docker. It fetches real-time weather data using the OpenWeather API and displays it to users. The app is containerized for easy development.

Or you can visit it on Render at the link in this repo’s description and test it yourself!

## Features
- Fetches current weather data for any city using the OpenWeather API.
- Built with Express.js for fast and lightweight server-side logic.
- Containerized with Docker for consistent environments.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (optional, for local development without Docker)
- An [OpenWeather API key](https://openweathermap.org/api) (free tier available)

## Getting Started

### 1. Clone the Repository
Clone this repository to your local machine using HTTPS:
```bash
git clone https://github.com/whoosh09/weather-check.git
cd weather-check
```

**Note**: If you prefer SSH and have SSH keys set up with GitHub, use:
```bash
git clone git@github.com:whoosh09/weather-check.git
```

### 2. Set Up Environment Variables
Create a `.env` file in the project root and add your OpenWeather API key:
```bash
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Run with Docker
The app is containerized using Docker for easy setup.

#### Build and Run the Docker Container
1. Build the Docker image:
   ```bash
   docker build -t weather-app .
   ```
2. Run the container, mapping the app’s port to your host and setting Google’s DNS to avoid `EAI_AGAIN` errors:
   ```bash
   docker run --dns 8.8.8.8 -p 3000:3000 --env-file .env weather-app
   ```
   - `--dns 8.8.8.8`: Uses Google’s DNS to resolve network issues.
   - `-p 3000:3000`: Maps port 3000 on your host to the container.
   - `--env-file .env`: Loads the environment variables from the `.env` file.

3. Open your browser and visit `http://localhost:3000` to view the app.

### 4. Run Without Docker (Optional)
If you want to run the app directly with Node.js:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app with nodemon:
   ```bash
   nodemon index.js
   ```
3. Visit `http://localhost:3000` in your browser.

## Acknowledgments
- [OpenWeather API](https://openweathermap.org/) for weather data.
- [Express.js](https://expressjs.com/) for the web framework.
- [Docker](https://www.docker.com/) for containerization.