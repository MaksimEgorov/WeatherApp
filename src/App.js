import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "b3375d11b45ecae32d24c8effeb3fec3";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        if (city) {
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();

            var sunset = data.sys.sunset;
            var date = new Date();
            date.setTime(sunset);
            var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Please, enter city name"
            });
        }
    }

    render() {
        return (
            <div className="weatherApp">
                <div className="weather__container">
                    <Info/>
                    <div>
                    <Form weatherMethod={this.gettingWeather}/>
                    <Weather
                        temp={this.state.temp}
                        city={this.state.city}
                        country={this.state.country}
                        pressure={this.state.pressure}
                        sunset={this.state.sunset}
                        error={this.state.error}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
