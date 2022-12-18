import React, {useContext} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fonts} from '../assets';
import {GlobalContext} from '../Store/globalContext';
import {colors} from '../utils';

const CardItem = ({
  title = '',
  boxIconColor = colors.primary,
  iconName = 'alert-outline',
  onChangeToggle,
  valueToggle = false,
}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <View style={styles.container}>
      <View style={[styles.boxIcon, {backgroundColor: boxIconColor}]}>
        <Icon name={iconName} color={colors.white} size={20} />
      </View>
      <View style={[styles.boxText, {borderBottomWidth: dark ? 0.3 : 2}]}>
        <Text
          style={[styles.text, {color: dark ? colors.white : colors.black}]}>
          {title}
        </Text>
        <Pressable onPress={onChangeToggle}>
          <View
            style={[
              styles.boxToggle,
              {
                backgroundColor: valueToggle
                  ? colors.primary
                  : dark
                  ? '#242424'
                  : colors.lightgray,

                alignItems: valueToggle ? 'flex-end' : 'flex-start',
              },
            ]}>
            <View style={styles.pinToggle}></View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 10,
  },
  boxText: {
    height: 60,
    width: '80%',
    borderBottomWidth: 2,
    borderColor: colors.lightgray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    marginLeft: 10,
    fontSize: 16,
    width: '50%',
  },
  boxToggle: {
    height: 40,
    width: 60,
    borderRadius: 40,
    padding: 3,
  },
  pinToggle: {
    height: 34,
    width: 34,
    backgroundColor: colors.white,
    borderRadius: 34,
  },
});
export default CardItem;
