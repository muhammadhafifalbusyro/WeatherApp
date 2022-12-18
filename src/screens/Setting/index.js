import React, {useContext} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import {ButtonCustom} from '../../components';
import {GlobalContext} from '../../Store/globalContext';

const Setting = ({navigation, route}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const _setDarkTheme = () => {
    if (dark == true) {
      return false;
    }
    globalContext.dispatch({type: 'TOGGLE_IS_DARK'});
  };
  const _setLightTheme = () => {
    if (dark == false) {
      return false;
    }
    globalContext.dispatch({type: 'TOGGLE_IS_DARK'});
  };
  console.log(globalContext.state);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.body,
          {
            backgroundColor: dark ? colors.black : colors.white,
          },
        ]}>
        <ButtonCustom title="Dark Theme" onPress={_setDarkTheme} />
        <ButtonCustom
          title="Light Theme"
          color={colors.green}
          style={{marginTop: dimens.m}}
          onPress={_setLightTheme}
          buttonStyle={{marginTop: dimens.l}}
        />
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
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.black,
  },
});
export default Setting;
