import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';
import {GlobalContext} from '../../Store/globalContext';
import {getMoviesFromApi} from '../../services/TestConsume';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonCustom, CardItem} from '../../components';

const Detail = ({navigation, route}) => {
  const {dataCurrent} = route.params;
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const [allowNotif, setAllowNotif] = useState(true);
  const [schedule, setSchedule] = useState(false);
  const [precipitation, setPrecipitation] = useState(true);
  const [major, setMajor] = useState(true);
  const [morning, setMorning] = useState(true);
  const [evening, setEvening] = useState(true);
  const [lightningTracker, setLightningTracker] = useState(true);
  const [huricaneTracker, setHuricaneTracker] = useState(true);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: dark ? colors.black : colors.white},
      ]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text
            onPress={() => navigation.goBack()}
            style={[
              styles.textHeader,
              {color: dark ? colors.white : colors.black},
            ]}>
            Cancel
          </Text>
          <Text
            onPress={() => navigation.goBack()}
            style={[
              styles.textHeader,
              {color: dark ? colors.white : colors.black},
            ]}>
            Done
          </Text>
        </View>
        <View style={styles.wrapWeather}>
          <View style={styles.bodyWeather}>
            <View style={styles.wrapContentHeader}>
              <Icon
                name="cloudy-night-outline"
                size={30}
                color={colors.black}
              />
              <Text
                style={[
                  styles.wrapTextContent,
                  {color: dark ? colors.white : colors.black},
                ]}>
                {dataCurrent != null
                  ? Math.ceil(dataCurrent.main.temp) + '°C'
                  : '0°C'}
              </Text>
            </View>
            <View style={styles.wrapMinMax}>
              <Icon
                name="arrow-up"
                size={30}
                color={dark ? colors.white : colors.black}
              />
              <Text
                style={[
                  styles.textMinMax,
                  {color: dark ? colors.white : colors.black},
                ]}>
                {dataCurrent != null
                  ? Math.ceil(dataCurrent.main.temp_max) + '°C'
                  : '0°C'}
              </Text>
              <Icon
                name="arrow-down"
                size={30}
                color={dark ? colors.white : colors.black}
                style={{marginLeft: 10}}
              />
              <Text
                style={[
                  styles.textMinMax,
                  {color: dark ? colors.white : colors.black, marginLeft: 10},
                ]}>
                {dataCurrent != null
                  ? Math.ceil(dataCurrent.main.temp_min) + '°C'
                  : '0°C'}
              </Text>
            </View>
            <Text
              style={[
                styles.descWeather,
                {color: dark ? colors.white : colors.black},
              ]}>
              {dataCurrent != null ? dataCurrent.weather : ''}
            </Text>
          </View>
        </View>

        <CardItem
          title="Allow Notifications"
          iconName="notifications"
          boxIconColor="limegreen"
          valueToggle={allowNotif}
          onChangeToggle={() => setAllowNotif(!allowNotif)}
        />
        <CardItem
          title="Schedule"
          iconName="notifications-circle"
          boxIconColor="#9e4af7"
          valueToggle={schedule}
          onChangeToggle={() => setSchedule(!schedule)}
        />

        <Text
          style={[styles.title, {color: dark ? colors.white : colors.black}]}>
          WEATHER UPDATES
        </Text>
        <CardItem
          title="Precipitation Updates"
          iconName="umbrella"
          boxIconColor="deepskyblue"
          valueToggle={precipitation}
          onChangeToggle={() => setPrecipitation(!precipitation)}
        />
        <CardItem
          title="Major Changes"
          iconName="cloud"
          boxIconColor="orange"
          valueToggle={major}
          onChangeToggle={() => setMajor(!major)}
        />

        {/* morning updates */}
        <View style={styles.wrapBodyContent}>
          <View style={[styles.boxIcon, {backgroundColor: 'gold'}]}>
            <Icon name="sunny" color={colors.white} size={20} />
          </View>
          <View
            style={[
              styles.wrapTextItem,
              {borderBottomWidth: morning ? 0 : dark ? 0.3 : 2},
            ]}>
            <Text
              style={[
                styles.textItem,
                {color: dark ? colors.white : colors.black},
              ]}>
              Morning Updates
            </Text>
            <Pressable onPress={() => setMorning(!morning)}>
              <View
                style={[
                  styles.toggleWrap,
                  {
                    backgroundColor: morning
                      ? colors.primary
                      : dark
                      ? '#242424'
                      : colors.lightgray,

                    alignItems: morning ? 'flex-end' : 'flex-start',
                  },
                ]}>
                <View style={styles.pin}></View>
              </View>
            </Pressable>
          </View>
        </View>
        {morning && (
          <View style={styles.wrapBodyContent}>
            <View
              style={[
                styles.boxIcon,
                {backgroundColor: dark ? colors.black : colors.white},
              ]}></View>
            <View
              style={[
                styles.wrapTextItem,
                {borderBottomWidth: morning ? (dark ? 0.3 : 2) : 0},
              ]}>
              <Text
                style={[
                  styles.textItem,
                  {color: dark ? colors.white : colors.black},
                ]}>
                Delivery Time
              </Text>

              <View style={styles.boxTime}>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsRegular,
                    color: colors.black,
                  }}>
                  08:00
                </Text>
              </View>
            </View>
          </View>
        )}
        {/* Evening Updates */}
        <View style={styles.wrapBodyContent}>
          <View style={[styles.boxIcon, {backgroundColor: 'gold'}]}>
            <Icon name="moon" color={colors.white} size={20} />
          </View>
          <View
            style={[
              styles.wrapTextItem,
              {borderBottomWidth: evening ? 0 : dark ? 0.3 : 2},
            ]}>
            <Text
              style={[
                styles.textItem,
                {color: dark ? colors.white : colors.black},
              ]}>
              Evening Updates
            </Text>
            <Pressable onPress={() => setEvening(!evening)}>
              <View
                style={[
                  styles.toggleWrap,
                  {
                    backgroundColor: evening
                      ? colors.primary
                      : dark
                      ? '#242424'
                      : colors.lightgray,

                    alignItems: evening ? 'flex-end' : 'flex-start',
                  },
                ]}>
                <View style={styles.pin}></View>
              </View>
            </Pressable>
          </View>
        </View>
        {evening && (
          <View style={styles.wrapBodyContent}>
            <View
              style={[
                styles.boxIcon,
                {backgroundColor: dark ? colors.black : colors.white},
              ]}></View>
            <View
              style={[
                styles.wrapTextItem,
                {borderBottomWidth: evening ? (dark ? 0.3 : 2) : 0},
              ]}>
              <Text
                style={[
                  styles.textItem,
                  {color: dark ? colors.white : colors.black},
                ]}>
                Delivery Time
              </Text>

              <View style={styles.boxTime}>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsRegular,
                    color: colors.black,
                  }}>
                  21:00
                </Text>
              </View>
            </View>
          </View>
        )}
        {/* End Evening */}
        <Text
          style={[styles.title, {color: dark ? colors.white : colors.black}]}>
          SEVERE WEATHER
        </Text>
        {/* Lightning Tracker */}
        <View style={styles.wrapBodyContent}>
          <View style={[styles.boxIcon, {backgroundColor: 'gold'}]}>
            <Icon name="flash" color={colors.white} size={20} />
          </View>
          <View
            style={[
              styles.wrapTextItem,
              {borderBottomWidth: lightningTracker ? 0 : dark ? 0.3 : 2},
            ]}>
            <Text
              style={[
                styles.textItem,
                {color: dark ? colors.white : colors.black},
              ]}>
              Lightning Tracker
            </Text>
            <Pressable onPress={() => setLightningTracker(!lightningTracker)}>
              <View
                style={[
                  styles.toggleWrap,
                  {
                    backgroundColor: lightningTracker
                      ? colors.primary
                      : dark
                      ? '#242424'
                      : colors.lightgray,

                    alignItems: lightningTracker ? 'flex-end' : 'flex-start',
                  },
                ]}>
                <View style={styles.pin}></View>
              </View>
            </Pressable>
          </View>
        </View>
        {lightningTracker && (
          <View style={styles.lightningWrap}>
            <View style={styles.boxIconLighning}></View>
            <View
              style={[
                styles.wrapBodyLightning,
                {
                  borderBottomWidth: lightningTracker ? (dark ? 0.3 : 2) : 0,
                },
              ]}>
              <Text
                style={[
                  styles.textItem,
                  {color: dark ? colors.white : colors.black, marginBottom: 10},
                ]}>
                Distance, km
              </Text>
              <View style={styles.wrapDistance}>
                {[1, 8, 16, 24, 48].map((value, key) => {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.boxDistance,
                        {
                          backgroundColor: value == 24 ? colors.white : '',
                        },
                      ]}>
                      <Text
                        style={{
                          fontFamily: fonts.PoppinsRegular,
                          color: colors.primary,
                        }}>
                        {value}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <Text
                style={[
                  styles.textPlace,
                  {
                    color: colors.gray,
                    fontSize: 14,
                    marginTop: 10,
                  },
                ]}>
                You'll only receive notifications about lightning strikes
                detected within the seleceted range from the location
              </Text>
            </View>
          </View>
        )}
        <CardItem
          title="Hurricane Tracker "
          iconName="thunderstorm"
          boxIconColor="red"
          valueToggle={huricaneTracker}
          onChangeToggle={() => setHuricaneTracker(!huricaneTracker)}
        />
        <View style={styles.wrapBodyContent}>
          <View style={[styles.boxIcon, {backgroundColor: 'gold'}]}>
            <Icon name="alert-circle" color={colors.white} size={20} />
          </View>
          <View
            style={[styles.wrapTextItem, {borderBottomWidth: dark ? 0.3 : 2}]}>
            <Text
              style={[
                styles.textItem,
                {color: dark ? colors.white : colors.black},
              ]}>
              Severe Weather Alerts
            </Text>
            <View
              style={{
                height: 40,
                width: 60,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  color: colors.green,
                  textAlign: 'right',
                }}>
                All {'>'}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={[styles.title, {color: dark ? colors.white : colors.black}]}>
          ACTUAL LOCATION
        </Text>
        <View style={styles.boxContent}>
          <View style={styles.boxIcon}>
            <Icon name="location" color={colors.white} size={20} />
          </View>
          <View
            style={[
              styles.bodyText,
              {borderBottomWidth: lightningTracker ? 0 : 2},
            ]}>
            <Text
              style={[
                styles.textPlace,
                {
                  color: dark ? colors.white : colors.black,
                },
              ]}>
              {dataCurrent != null ? dataCurrent.place : ''}
            </Text>
            <Text
              style={[
                styles.textPlace,
                {
                  color: colors.gray,
                  fontSize: 12,
                },
              ]}>
              LAT: {dataCurrent != null ? dataCurrent.coord.lat : ''}, LON:{' '}
              {dataCurrent != null ? dataCurrent.coord.lon : ''}
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <ButtonCustom title="Delete Location" color="lightpink" />
        </View>
        <View style={{height: 50, width: '100%'}} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.black,
  },
  header: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    fontSize: 16,
  },
  wrapWeather: {
    height: 200,
    width: '100%',
  },
  bodyWeather: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapContentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  wrapTextContent: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
    fontSize: 40,
  },
  wrapMinMax: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMinMax: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
    fontSize: 20,
  },
  descWeather: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
    fontSize: 20,
  },
  title: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    margin: 20,
    marginBottom: 0,
    fontSize: 16,
  },
  boxContent: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  bodyText: {
    height: 60,
    width: '80%',

    borderColor: colors.lightgray,
    justifyContent: 'center',
  },
  textPlace: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
    fontSize: 16,
    width: '100%',
  },
  wrapBodyContent: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapTextItem: {
    height: 60,
    width: '80%',
    borderColor: colors.lightgray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textItem: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
    fontSize: 16,
    width: '50%',
  },
  toggleWrap: {
    height: 40,
    width: 60,
    borderRadius: 40,
    padding: 3,
  },
  pin: {
    height: 34,
    width: 34,
    backgroundColor: colors.white,
    borderRadius: 34,
  },
  boxTime: {
    height: 40,
    width: 80,
    backgroundColor: colors.lightgray,
    borderRadius: 10,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightningWrap: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxIconLighning: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  wrapBodyLightning: {
    width: '80%',
    borderColor: colors.lightgray,
    paddingVertical: 10,
  },
  wrapDistance: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    backgroundColor: colors.lightgray,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  boxDistance: {
    height: 36,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Detail;
