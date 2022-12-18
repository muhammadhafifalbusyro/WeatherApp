import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';

const Splash = ({navigation, route}) => {
  useEffect(() => {
    const wait = ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };
    let mounted = true;
    if (mounted) {
      wait(3000).then(() => {
        navigation.replace('MainNavigator');
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={[styles.text, {marginTop: dimens.xxl}]}>
          GoSpotWeatherApp
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.white,
  },
});
export default Splash;
