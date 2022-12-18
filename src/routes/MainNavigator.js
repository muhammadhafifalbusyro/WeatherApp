import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Home, Setting} from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../utils';
import {GlobalContext} from '../Store/globalContext';

const Tab = createMaterialBottomTabNavigator();

function MainNavigator() {
  const globalContext = React.useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.primary}
      inactiveColor="#95a5a6"
      shifting={false}
      barStyle={[
        styles.barStyle,
        {
          backgroundColor: dark ? colors.black : colors.white,
          borderTopWidth: dark ? 0.3 : 0,
          borderRightWidth: dark ? 0.3 : 0,
          borderLeftWidth: dark ? 0.3 : 0,
          borderColor: colors.gray,
        },
      ]}
      style={{
        backgroundColor: dark ? colors.black : colors.white,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 8,

    justifyContent: 'center',
    height: 75,
    borderColor: colors.lightGray,
    position: 'absolute', //use if you want to absolute navbar
    width: '100%',
  },
});
export default MainNavigator;
