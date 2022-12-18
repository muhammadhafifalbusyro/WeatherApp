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
import {CardItem} from '../../components';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Detail = ({navigation, route}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const [perTimeDatasWeather, setPerTimeDatasWeather] = useState([{}, {}, {}]);
  const [hourlyForecast, setHourlyForecast] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [next14Days, setNext14Days] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [keyItem, setkeyItem] = useState(null);
  const [allowNotif, setAllowNotif] = useState(true);
  const [schedule, setSchedule] = useState(false);
  const [precipitation, setPrecipitation] = useState(true);
  const [major, setMajor] = useState(true);
  const [morning, setMorning] = useState(true);
  const [evening, setEvening] = useState(true);

  const openModal = key => {
    if (key == keyItem) {
      setkeyItem(null);
    } else {
      setkeyItem(key);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 50,
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <Text
            style={{
              fontFamily: fonts.PoppinsRegular,
              color: colors.black,
              marginLeft: 10,
              fontSize: 16,
            }}>
            Cancel
          </Text>
          <Text
            style={{
              fontFamily: fonts.PoppinsRegular,
              color: colors.black,
              marginLeft: 10,
              fontSize: 16,
            }}>
            Done
          </Text>
        </View>
        <View
          style={{height: 200, width: '100%', backgroundColor: colors.white}}>
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}>
              <Icon
                name="cloudy-night-outline"
                size={30}
                color={colors.black}
              />
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  color: colors.black,
                  marginLeft: 10,
                  fontSize: 40,
                }}>
                30°
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="arrow-up" size={30} color={colors.black} />
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  color: colors.black,
                  marginLeft: 10,
                  fontSize: 20,
                }}>
                30°
              </Text>
              <Icon
                name="arrow-down"
                size={30}
                color={colors.black}
                style={{marginLeft: 10}}
              />
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  color: colors.black,
                  marginLeft: 10,
                  fontSize: 20,
                }}>
                25°
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.PoppinsRegular,
                color: colors.black,
                marginLeft: 10,
                fontSize: 20,
              }}>
              Mostly Sunny
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: colors.white,
          }}>
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
            style={{
              fontFamily: fonts.PoppinsRegular,
              color: colors.black,
              margin: 20,
              marginBottom: 0,
              fontSize: 16,
            }}>
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
          <View
            style={{
              height: 60,
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gold',
                borderRadius: 10,
              }}>
              <Icon name="sunny" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: morning ? 0 : 2,
                borderColor: colors.lightgray,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  color: colors.black,
                  marginLeft: 10,
                  fontSize: 16,
                  width: '50%',
                }}>
                Morning Updates
              </Text>
              <Pressable onPress={() => setMorning(!morning)}>
                <View
                  style={{
                    height: 40,
                    width: 60,
                    backgroundColor: morning
                      ? colors.primary
                      : colors.lightgray,
                    borderRadius: 40,
                    padding: 3,
                    alignItems: morning ? 'flex-end' : 'flex-start',
                  }}>
                  <View
                    style={{
                      height: 34,
                      width: 34,
                      backgroundColor: colors.white,
                      borderRadius: 34,
                    }}></View>
                </View>
              </Pressable>
            </View>
          </View>
          {morning && (
            <View
              style={{
                height: 60,
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 60,
                  width: '80%',
                  borderBottomWidth: morning ? 2 : 0,
                  borderColor: colors.lightgray,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsRegular,
                    color: colors.black,
                    marginLeft: 10,
                    fontSize: 16,
                    width: '50%',
                  }}>
                  Delivery Time
                </Text>

                <View
                  style={{
                    height: 40,
                    width: 80,
                    backgroundColor: colors.lightgray,
                    borderRadius: 10,
                    padding: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
          <View
            style={{
              height: 60,
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'pink',
                borderRadius: 10,
              }}>
              <Icon name="moon" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: evening ? 0 : 2,
                borderColor: colors.lightgray,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  color: colors.black,
                  marginLeft: 10,
                  fontSize: 16,
                  width: '50%',
                }}>
                Evening Updates
              </Text>
              <Pressable onPress={() => setEvening(!evening)}>
                <View
                  style={{
                    height: 40,
                    width: 60,
                    backgroundColor: evening
                      ? colors.primary
                      : colors.lightgray,
                    borderRadius: 40,
                    padding: 3,
                    alignItems: evening ? 'flex-end' : 'flex-start',
                  }}>
                  <View
                    style={{
                      height: 34,
                      width: 34,
                      backgroundColor: colors.white,
                      borderRadius: 34,
                    }}></View>
                </View>
              </Pressable>
            </View>
          </View>
          {evening && (
            <View
              style={{
                height: 60,
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 60,
                  width: '80%',
                  borderBottomWidth: evening ? 2 : 0,
                  borderColor: colors.lightgray,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsRegular,
                    color: colors.black,
                    marginLeft: 10,
                    fontSize: 16,
                    width: '50%',
                  }}>
                  Delivery Time
                </Text>

                <View
                  style={{
                    height: 40,
                    width: 80,
                    backgroundColor: colors.lightgray,
                    borderRadius: 10,
                    padding: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
        </View>
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
});
export default Detail;
