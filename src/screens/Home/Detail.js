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
import {color} from 'react-native-reanimated';

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
                backgroundColor: colors.green,
                borderRadius: 10,
              }}>
              <Icon name="notifications" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: 2,
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
                Allow Notification
              </Text>
              <View
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  padding: 3,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: colors.white,
                    borderRadius: 34,
                  }}></View>
              </View>
            </View>
          </View>
          {/* schedule */}
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
                backgroundColor: colors.green,
                borderRadius: 10,
              }}>
              <Icon
                name="notifications-circle"
                color={colors.white}
                size={20}
              />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: 2,
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
                Schedule
              </Text>
              <View
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: colors.lightgray,
                  borderRadius: 40,
                  padding: 3,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: colors.white,
                    borderRadius: 34,
                  }}></View>
              </View>
            </View>
          </View>
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
                backgroundColor: colors.green,
                borderRadius: 10,
              }}>
              <Icon name="umbrella" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: 2,
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
                Precipitation Updates
              </Text>
              <View
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  padding: 3,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: colors.white,
                    borderRadius: 34,
                  }}></View>
              </View>
            </View>
          </View>
          {/* Major Changes */}
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
                backgroundColor: colors.green,
                borderRadius: 10,
              }}>
              <Icon name="cloud" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: 2,
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
                Major Changers
              </Text>
              <View
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  padding: 3,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: colors.white,
                    borderRadius: 34,
                  }}></View>
              </View>
            </View>
          </View>
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
                backgroundColor: colors.green,
                borderRadius: 10,
              }}>
              <Icon name="sunny" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: 2,
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
              <View
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  padding: 3,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: colors.white,
                    borderRadius: 34,
                  }}></View>
              </View>
            </View>
          </View>
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
                backgroundColor: colors.green,
                borderRadius: 10,
              }}>
              <Icon name="moon" color={colors.white} size={20} />
            </View>
            <View
              style={{
                height: 60,
                width: '80%',
                borderBottomWidth: 2,
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
              <View
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  padding: 3,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: colors.white,
                    borderRadius: 34,
                  }}></View>
              </View>
            </View>
          </View>
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
