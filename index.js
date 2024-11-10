document.getElementById('getApi').addEventListener('click', getApi);
const apiId = 'f7588f03c7354807a1b133358240711';

function getApi() {
    const cityName = document.getElementById('cityName').value;
    
    if (!cityName) {
        document.getElementById('output').innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
        return;
    }
    
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiId}&q=${cityName}&aqi=yes`;

    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then((data) => {
            updateBackground(data.current.condition.text);
            const output = `
                <div class="glass-background text-center">
                    <p class="m-0" style="font-weight:bold; font-size:2rem;">${data.location.name}</p>
                    <p class="m-0" style="font-weight:bold; font-size:4rem;">${data.current.temp_c}<sup>°C</sup></p>
                    <p class="m-0" style="font-size:1.2rem;">Condition: ${data.current.condition.text}</p>
                    <p class="m-0" style="font-size:1.2rem;">Humidity: ${data.current.humidity}%</p>
                    <p class="m-0" style="font-size:1.2rem;">Wind Speed: ${data.current.wind_kph} kph</p>
                </div>
            `;
            document.getElementById('output').innerHTML = output;
        })
        .catch((err) => {
            document.getElementById('output').innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
            console.log(err);
        });
}

function updateBackground(condition) {
    const body = document.body;
    switch (condition.toLowerCase()) {
        case 'sunny':
            body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
            break;
        case 'cloudy':
            body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
            body.style.background = 'linear-gradient(to right, #4b79a1, #283e51)';
            break;
        case 'snow':
            body.style.background = 'linear-gradient(to right, #e6dada, #274046)';
            break;
        default:
            updateTimeBasedBackground();
    }
}

function updateTimeBasedBackground() {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
        document.body.style.background = 'linear-gradient(to right, #FFDD00, #FBB034)';
    } else if (hours >= 12 && hours < 18) {
        document.body.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
    } else if (hours >= 18 && hours < 20) {
        document.body.style.background = 'linear-gradient(to right, #fcb045, #fd1d1d, #833ab4)';
    } else {
        document.body.style.background = 'linear-gradient(to right, #0f2027, #203a43, #2c5364)';
    }
}
