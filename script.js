let api={
key:"be598e5e63fe3f614a65fb6e0de71b76",
base:"https://api.openweathermap.org/data/2.5/"
}
let search=document.querySelector(".search");
let btn=document.querySelector(".btn");
btn.addEventListener("click",getInput);


function getInput(event){
    event.preventDefault();
    if(event.type =="click"){
       getData(search.value);
       console.log(search.value);

    }
        
}
function getData(city){
    fetch(`${api.base}weather?q=${city}&appid=${api.key}`)
    .then(response=>{
        return response.json();
    }).then(displayData);
}
function displayData(response){
    console.log(response);
    if(response.cod=== "404"){
        let error=document.querySelector(".error")
        error.textContent="please enter a valid city name";
        search.value="";
    }else{
        let city=document.querySelector(".city")
            city.textContent=`${response.name},${response.sys.country}`

            let today=new Date();
            let date=document.querySelector(".date");
            date.textContent=getDates(today)

            let temp=document.querySelector(".temp")
            temp.textContent=` Temp: ${Math.round(response.main.temp-273)}°C`

            let weather=document.querySelector(".weather");
            weather.textContent=` Weather : ${response.weather[0].main}`

            let tempRange= document.querySelector(".temp-range")
            tempRange.textContent= `Temp Range:${Math.round(response.main.temp_min-273)}°C / ${Math.round(response.main.temp_max)}°C`

            let weatherIcon=document.querySelector(".weather-icon")
            let newURL="  https://openweathermap.org/img/wn/"
            weatherIcon.src=`${newURL}${response.weather[0].icon}@2x.png`
    } 
}
function getDates(d){
    let months=["Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let days=["sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
}