import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
  RefreshControl,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';
import {GlobalContext} from '../../Store/globalContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {getWeatherCurrent, getWeatherForecast} from '../../services/Weather';
import {AppConfig} from '../../services';
const moment = require('moment');

const Home = ({navigation, route}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setdailyForecast] = useState([]);
  const [keyItem, setkeyItem] = useState(null);
  const [dataCurrent, setDataCurrent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    Geolocation.getCurrentPosition(async info => {
      console.log('coord', info);
      let data = info;
      const param = {
        lat: data.coords.latitude,
        lon: data.coords.longitude,
        appid: AppConfig.apiKey,
        units: 'metric',
      };
      setLoading(true);
      const result = await getWeatherCurrent(param);
      console.log('result...', result);
      if (result.id) {
        const resultForecast = await getWeatherForecast(param);
        console.log('forecast data...', resultForecast);
        if (resultForecast == 'TypeError: Network request failed') {
          setLoading(false);
          alert('Network request failed');
          return false;
        }
        const dataWeatherForecast = resultForecast.list;
        const dataWeatherHourly = dataWeatherForecast.filter(value => {
          return (
            moment(new Date()).format('DD MMMM YYYY') ==
            moment(value.dt_txt).format('DD MMMM YYYY')
          );
        });
        console.log('data hourly', dataWeatherHourly);

        const groups = dataWeatherForecast.reduce((groups, weather) => {
          const date = moment(weather.dt_txt).format('DD MMMM YYYY');
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(weather);
          return groups;
        }, {});

        const dataWeatherDaily = Object.keys(groups).map(date => {
          return {
            date,
            weather: groups[date],
          };
        });

        const filterDataNextDay = dataWeatherDaily.filter(ele => {
          return ele.date > moment(new Date()).format('DD MMMM YYYY');
        });

        console.log('inigroupArrays', dataWeatherDaily);

        let obj = {
          place: result.name,
          main: result.main,
          weather: result.weather[0].main,
        };

        setHourlyForecast(dataWeatherHourly);
        setdailyForecast(filterDataNextDay);
        setDataCurrent(obj);
        setLoading(false);
      } else {
        alert('Network request failed');
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const openModal = key => {
    if (key == keyItem) {
      setkeyItem(null);
    } else {
      setkeyItem(key);
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: dark ? '#242424' : colors.white},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getData();
            }}
          />
        }>
        <ImageBackground
          source={images.background}
          style={styles.imgBackground}>
          <View style={styles.wrapperImgBackground}>
            <Pressable
              onPress={() => {
                navigation.navigate('Detail');
              }}>
              <View style={styles.cityWrapper}>
                <Icon name="star" color={colors.white} size={15} />
                <Text style={styles.textCity}>
                  {dataCurrent != null ? dataCurrent.place : ''}
                </Text>
              </View>
            </Pressable>
            <View style={styles.weatherHeader}>
              <Icon
                name="cloudy-night-outline"
                size={30}
                color={colors.white}
              />
              <Text style={styles.textWeatherHeader}>
                {dataCurrent != null
                  ? Math.ceil(dataCurrent.main.temp) + '°C'
                  : '0°C'}
              </Text>
            </View>
            <View style={styles.wrapperMixMax}>
              <Icon name="arrow-up" size={30} color={colors.gray} />
              <Text style={styles.textMin}>
                {dataCurrent != null
                  ? Math.ceil(dataCurrent.main.temp_max) + '°C'
                  : '0°C'}
              </Text>
              <Icon
                name="arrow-down"
                size={30}
                color={colors.gray}
                style={{marginLeft: 10}}
              />
              <Text style={styles.textMax}>
                {dataCurrent != null
                  ? Math.ceil(dataCurrent.main.temp_min) + '°C'
                  : '0°C'}
              </Text>
            </View>
            <Text style={styles.textWeatherTitle}>
              {dataCurrent != null ? dataCurrent.weather : ''}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={[
            styles.body,
            {backgroundColor: dark ? colors.black : colors.white},
          ]}>
          <ScrollView
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: 25}}>
            {hourlyForecast.map((value, key) => {
              return (
                <View
                  key={key}
                  style={[
                    styles.boxHourlyForecast,
                    {marginRight: key + 1 == hourlyForecast.length ? 20 : 0},
                  ]}>
                  <View style={styles.wrapTime}>
                    <Icon
                      name="tennisball-outline"
                      size={20}
                      color={colors.orange}
                    />
                    <Text style={styles.textAt}>
                      at {moment(value.dt_txt).format('HH:mm')}
                    </Text>
                  </View>
                  <Text style={styles.textDesc}>
                    {value.weather[0].description}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          <Text
            style={[
              styles.textHourlyForecast,
              {color: dark ? colors.white : colors.black},
            ]}>
            HOURLY FORECAST
          </Text>
          <ScrollView
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 25}}>
            {hourlyForecast.map((value, key) => {
              return (
                <View
                  key={key}
                  style={[
                    styles.boxHourly,
                    {marginRight: key + 1 == hourlyForecast.length ? 20 : 0},
                  ]}>
                  <Text style={[styles.timeHour]}>
                    {moment(value.dt_txt).format('HH:mm')}
                  </Text>
                  <Icon
                    name="rainy-outline"
                    size={20}
                    color={dark ? colors.white : colors.black}
                  />
                  <Text style={styles.titleRainPossibility}>
                    {value.rain ? value.rain['3h'] + '%' : '0%'}
                  </Text>
                  <Text style={styles.titleTemp}>
                    {Math.ceil(value.main.temp)}°C
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={[
              styles.wrapperBodyBottom,
              {backgroundColor: dark ? '#242424' : colors.lightgray},
            ]}>
            <Text
              style={[
                styles.titlenextDay,
                {color: dark ? colors.white : colors.black},
              ]}>
              NEXT {dailyForecast.length} DAYS
            </Text>
            {dailyForecast.map((value, key) => {
              if (keyItem == key) {
                return (
                  <View key={key} style={styles.cardWrapper}>
                    <View style={styles.subCardWrapper}>
                      <View style={styles.wrapperCard1}>
                        <Icon
                          name="rainy-outline"
                          size={20}
                          color={colors.black}
                        />
                        <View style={{marginLeft: 5}}>
                          <Text style={styles.titleDateCard}>{value.date}</Text>
                          <Text style={[styles.titleDateCard, {fontSize: 12}]}>
                            {value.weather[0].weather[0].description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.wrapperMixMax}>
                        <Icon name="arrow-up" size={15} color={colors.gray} />
                        <Text
                          style={[
                            styles.textMax,
                            {fontSize: 14, color: colors.black},
                          ]}>
                          {Math.ceil(value.weather[0].main.temp_max)}°
                        </Text>
                        <Icon
                          name="arrow-down"
                          size={15}
                          color={colors.gray}
                          style={{marginLeft: 10}}
                        />
                        <Text
                          style={[
                            styles.textMin,
                            {fontSize: 14, color: colors.black},
                          ]}>
                          {Math.ceil(value.weather[0].main.temp_min)}°
                        </Text>
                      </View>
                    </View>
                    <View style={styles.spacer}></View>
                    <View style={styles.wrapPosibble}>
                      <View style={styles.boxPosibble}>
                        <Icon
                          name="umbrella-outline"
                          size={20}
                          color={colors.gray}
                        />
                        <Text style={styles.textPosibble}>Chance</Text>
                        <Text style={styles.percantagePosibble}>0%</Text>
                      </View>
                      <View style={styles.boxPosibble}>
                        <Icon
                          name="water-outline"
                          size={20}
                          color={colors.gray}
                        />
                        <Text style={styles.textPosibble}>Precipitation</Text>
                        <Text style={styles.percantagePosibble}>0%</Text>
                      </View>
                      <View style={styles.boxPosibble}>
                        <Icon
                          name="arrow-up-outline"
                          size={20}
                          color={colors.gray}
                          style={{transform: [{rotate: '45deg'}]}}
                        />
                        <Text style={styles.textPosibble}>Wind</Text>
                        <Text style={styles.percantagePosibble}>0%</Text>
                      </View>
                      <View style={styles.boxPosibble}>
                        <Icon
                          name="sunny-outline"
                          size={20}
                          color={colors.gray}
                        />
                        <Text style={styles.textPosibble}>Chance</Text>
                        <Text style={styles.percantagePosibble}>0%</Text>
                      </View>
                    </View>
                    <View style={[styles.spacer, {marginTop: 0}]}></View>
                    <ScrollView
                      horizontal={true}
                      nestedScrollEnabled={true}
                      showsHorizontalScrollIndicator={false}>
                      {value.weather.map((val, index) => {
                        return (
                          <View
                            key={index}
                            style={[
                              styles.wrapperSubWeatherBox,
                              {
                                marginLeft: index == 0 ? 0 : 20,
                                marginRight:
                                  index + 1 == value.weather.length ? 20 : 0,
                              },
                            ]}>
                            <Text style={styles.subTextDate}>
                              {moment(val.dt_txt).format('HH:mm')}
                            </Text>
                            <Icon
                              name="rainy-outline"
                              size={20}
                              color={colors.black}
                            />
                            <Text style={[styles.subTextDate, {marginTop: 5}]}>
                              {val.rain ? val.rain['3h'] + '%' : '0%'}
                            </Text>
                            <Text style={[styles.subTextDate, {marginTop: 5}]}>
                              {Math.ceil(val.main.temp)}°C
                            </Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                );
              } else {
                return (
                  <Pressable key={key} onPress={() => openModal(key)}>
                    <View style={styles.cardWrapper2}>
                      <View style={styles.subCardWrapper2}>
                        <Icon
                          name="rainy-outline"
                          size={20}
                          color={colors.black}
                        />
                        <View style={{marginLeft: 5}}>
                          <Text style={styles.titleDateCard}>{value.date}</Text>
                          <Text style={[styles.titleDateCard, {fontSize: 12}]}>
                            {value.weather[0].weather[0].description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.wrapperMixMax}>
                        <Icon name="arrow-up" size={15} color={colors.gray} />
                        <Text
                          style={[
                            styles.textMax,
                            {fontSize: 14, color: colors.black},
                          ]}>
                          {Math.ceil(value.weather[0].main.temp_max)}°
                        </Text>
                        <Icon
                          name="arrow-down"
                          size={15}
                          color={colors.gray}
                          style={{marginLeft: 10}}
                        />
                        <Text
                          style={[
                            styles.textMin,
                            {fontSize: 14, color: colors.black},
                          ]}>
                          {Math.ceil(value.weather[0].main.temp_min)}°
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              }
            })}
            <View style={{height: 80, width: '100%'}}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray,
  },
  body: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -25,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.black,
  },
  imgBackground: {
    height: 270,
    width: '100%',
  },
  wrapperImgBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cityWrapper: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.2)',
    borderRadius: 20,
  },
  textCity: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
    marginLeft: 10,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  textWeatherHeader: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
    marginLeft: 10,
    fontSize: 40,
  },
  wrapperMixMax: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMin: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
    marginLeft: 10,
    fontSize: 20,
  },
  textMax: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
    marginLeft: 10,
    fontSize: 20,
  },
  textWeatherTitle: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
    marginLeft: 10,
    fontSize: 20,
    marginBottom: 15,
  },
  boxHourlyForecast: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 300,
    backgroundColor: '#f7f5f5',
    borderRadius: 20,
    marginLeft: 20,
  },
  wrapTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAt: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
  },
  textDesc: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.gray,
  },
  textHourlyForecast: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginHorizontal: 20,
    fontSize: 16,
  },
  boxHourly: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 20,
  },
  timeHour: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.gray,
  },
  titleRainPossibility: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.gray,
    marginTop: 5,
  },
  titleTemp: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.gray,
    marginTop: 5,
  },
  wrapperBodyBottom: {
    padding: 20,
    backgroundColor: colors.lightgray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titlenextDay: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: 16,
  },
  cardWrapper: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 10,

    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  subCardWrapper: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperCard1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDateCard: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
  },
  spacer: {
    height: 2,
    width: '100%',
    backgroundColor: colors.lightgray,
    marginTop: 20,
  },
  wrapPosibble: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  boxPosibble: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textPosibble: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.gray,
    marginTop: 5,
    fontSize: 12,
  },
  percantagePosibble: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginTop: 5,
  },
  wrapperSubWeatherBox: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  subTextDate: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.gray,
  },
  cardWrapper2: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subCardWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Home;
