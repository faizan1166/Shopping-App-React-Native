import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "./Home";
import Details from "./Details";
import Cart from "./Cart";
import Search from "./Search";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Products",
            headerStyle: {
              backgroundColor: "orange",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;

// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// const Tabs = AnimatedTabBarNavigator();

/* <NavigationContainer>
//   <Tabs.Navigator */
//     tabBarOptions={{
//       activeTintColor: "#2F7C6E",
//       inactiveTintColor: "orange",
//       activeBackgroundColor: "orange",
//       labelStyle: { fontWeight: "bold" },
//     }}
//   >
//     <Tabs.Screen
//       name="Home"
//       component={Home}
//       options={{
//         tabBarIcon: ({ focused, color, size }) => (
//           <Icon
//             name="home"
//             size={size ? size : 24}
//             color={focused ? color : "#222222"}
//             focused={focused}
//           />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Setting"
//       component={SettingScreen}
//       options={{
//         tabBarIcon: ({ focused, color, size }) => (
//           <Icon
//             name="settings"
//             size={size ? size : 24}
//             color={focused ? color : "#222222"}
//             focused={focused}
//           />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Group"
//       component={Group}
//       options={{
//         tabBarIcon: ({ focused, color, size }) => (
//           <Icon
//             name="group"
//             size={size ? size : 24}
//             color={focused ? color : "#222222"}
//             focused={focused}
//           />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Details"
//       options={() => ({
//         headerShown: true,
//       })}
//       component={Details}
//     />
//     {/* <Stack.Screen name="Details" component={Details} /> */}
//   </Tabs.Navigator>
// </NavigationContainer>


