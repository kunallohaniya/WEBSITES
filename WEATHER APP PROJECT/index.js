const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initially variables need???

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getformSessionStorage();

// ek kaam or pending hai ???

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        // switch krna 
        if(!searchForm.classList.contains("active")) {
           // is search form invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // main pehle search vle tab pr tha ab your weather tab visible krna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ab main your weather tab me aagya hu toh weather bhi display krna pdega,
            // so let's check local storage first ofr coordinates, if we have saved them there.
            getformSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(searchTab);

});

// /'check if coordinates are already present in the session storage'
function getformSessionStorage() {
const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        // agar local coordinates nhi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grant container invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }
}

function renderWeatherInfo(weatherInfo) {
    // firstly we have to fetch the elements
    
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // console.log(weatherInfo);
    // fetch value from weatherInfo object and put it UI elements 
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;

    
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //  HW -show an alert for no geolocation support available
      
    }
}

function showPosition(position) {

    const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
   }

   sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
   fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
       return;
    else
    fetchSearchWeatherInfo(cityName);
})

 async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
    //HW
   
    }
}




// console.log('hello kunal bhai');

// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// function renderWeatherInfo(data) {
//  let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} °c`;

//     document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails() {

//     try {
//         let city = "goa";
            
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//     const data = await response.json();

//     console.log("Weather data:->" , data);

   
//     renderWeatherInfo(data);
//     }
//     catch(err) {
//         // handle the error here
//     }
//     // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
// }

// async function getCustomWeatherDetails() {
//     try {
//     let latitude = 17.333;
//     let longitude = 18.633;

//     let result = await fetch(`https://api.openweathemap.org/data/2.5/weather?
//                    lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
//     let data = await result.json();

//     console.log(data);
//     }
//     catch(err) {
//         console.log("Error found" , err);
//     }
// }

// function switchTab(clickedTab) {

//     if(clickedTab !== currentTab) {
//         currentTab.classList.remove("current-tab");
//         currentTab = currentTab;
//         currentTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")) {
//             //kya search form wala container is invisible, if yes then make it visible
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else {
//             //main pehle search wale tab pr tha, ab your weather tab visible karna h 
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
//             //for coordinates, if we haved saved them there.
//             getfromSessionStorage();
//         }
//     }
// }

// function getLocation() {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No getLocation Support")
//     }
// }

// function showPosition(position) {
//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);

// }