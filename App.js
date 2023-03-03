import React from "react";
import { Provider } from "react-redux";
import { mystore } from "./redux/store/store";
import AppNavigator from "./Screen/AppNavigator";

const App = () => {
  return (
    <Provider store={mystore}>
      <AppNavigator />    
    </Provider>
  );
};
export default App;

// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// const Tabs = AnimatedTabBarNavigator();

{
  /* <NavigationContainer>
//   <Tabs.Navigator */
}
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
