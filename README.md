# Nutun Weather App

Nutun is a web application that provides weather forecasts and stores weather data in a MySQL database. It fetches geolocation and weather data from Mapbox and OpenWeather API, respectively. This app is built using Node.js, Express, MySQL, Axios, and Nunjucks.

## Features

- Retrieve weather forecasts based on user input (address).
- Save weather data (latitude, longitude, rain, sun, humidity, min/max temperatures) into a MySQL database.
- Display historical weather data (last 20 records) in a table format.
- Dynamic date formatting with moment.js.

## Installation

To run this project locally, follow these steps:

### Prerequisites

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Ensure you have [MySQL](https://www.mysql.com/) set up and running.

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/HlawulaniSibisi/nutun.git
    ```

2. Navigate to the project directory:

    ```bash
    cd nutun
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory with the following credentials:

    ```bash
    DATABASE_HOST=localhost
    DATABASE_USER=your_db_user
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=nutun
    ```

5. Import the SQL schema from the `nutun.sql` file to create the necessary table in your MySQL database:

    ```bash
    mysql -u your_db_user -p < nutun.sql
    ```

6. Start the app:

    ```bash
    node app.js
    ```

7. Access the app by visiting `http://localhost:3000` in your browser.

## Contributing

Feel free to fork this repository and create pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
