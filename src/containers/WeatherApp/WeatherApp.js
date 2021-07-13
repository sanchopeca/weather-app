import React, {useState, useEffect, useCallback} from 'react';
import './WeatherApp.css';
import WeatherBody from '../../components/WeatherBody/WeatherBody';
import Spinner from '../../components/UI/Spinner/Spinner';
import SearchBar from 'material-ui-search-bar';
import FiveDays from '../../components/FiveDays/FiveDays';


const WeatherApp = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [fiveDaysData, setFiveDaysData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [nextFiveDays, setNextFiveDays] = useState([]);


  const apiKey = 'd734853288118936518a4af03bdbcc5d';
  const API = 'https://api.openweathermap.org/data/2.5/'

  const dateBuilder = () => {
    let today = new Date();

    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    let todayIndex = today.getDay();

    let nextDays = days.filter((_, index)=> {
      return index >= todayIndex;
    })

    let updatedDays = [];

    if (nextDays.length <= 5) {
      nextDays.push(days)
    }
    
    updatedDays = nextDays.slice(1,6).flat();
    updatedDays.splice(0, 1, 'Tomorrow')

    setNextFiveDays(updatedDays);

    setCurrentDate({
      date: `${date} ${months[month - 1]} ${year}`,
      day: days[todayIndex]
    });
  }
  
  const getWeather = useCallback(query => {
      fetch(`${API}weather?q=${query}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData({
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
          lat: data.coord.lat,
          lon: data.coord.lon
        })
        setLoading(false);
      })
      .catch(error => {
        setWeatherData({});
        console.log(error)});

  }, []);
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      const query = search.length === 0 ? 'Belgrade' : search
      getWeather(query);
      dateBuilder();
    }, 1000)
    return () => {
      clearTimeout(timer);
    }
  }, [search, getWeather]);
  
  useEffect(() => {
    if (weatherData?.city){
      fetch(`${API}onecall?lat=${weatherData.lat}&lon=${weatherData.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(res => {
        setFiveDaysData(res.daily);
      })
      .catch(err => {
        setFiveDaysData([]);
        console.log()});
    }
  }, [weatherData])

  let attachedClasses = ['Wrapper', weatherData.weather];
  if(!weatherData.weather){
    attachedClasses = ['Wrapper', 'Default']
  }

  
 
  return (
    <React.Fragment>
       <div className={attachedClasses.join(' ')}>
          <SearchBar 
          onCancelSearch={() => {
            setSearch('Belgrade')
          }}
          cancelOnEscape
          
          style={{
            border: '1px solid #747378', 
            borderRadius: '0 0 100px 100px',
            background:'rgb(255 255 255 / 56%)',
            padding: '10px 20px'}}
            className={'Search'} 
            placeholder="Search..." 
            onChange={newValue => setSearch(newValue)}/>

          {loading  ? 
          <Spinner/> : 
          <div className={'Weather-Stats-Wrapper'}>
            <WeatherBody 
            weatherData={weatherData}
            currentDate={currentDate}
            />
          
            <FiveDays 
              weekDays ={nextFiveDays}
              data ={fiveDaysData.slice(1,6)}
            />
         
          </div>
          }
      </div>
     </React.Fragment> 
    )
  
}

export default WeatherApp;