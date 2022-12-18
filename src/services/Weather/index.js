import {get} from '..';

const getWeatherCurrent = param => {
  return get('/data/2.5/weather', param);
};
const getWeatherForecast = param => {
  return get('/data/2.5/forecast', param);
};

export {getWeatherCurrent, getWeatherForecast};
