import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { Header as HeaderRNE, Badge, Icon } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../redux/action/Actions";

const Cart = () => {
  const navigation = useNavigation();

  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  const removeItem = (index) => {
    dispatch(removeItemFromCart(index));
  };

  const item = useSelector((state) => state);
  let addedItems = [];
  addedItems = item;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderRNE
        backgroundColor="#ff6d00"
        leftComponent={
          <View>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-back" type="Ionicons" color="white" />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <Icon
                style={{ marginRight: 15, alignSelf: "center" }}
                name="search"
                type="feather"
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Icon
                style={{ alignSelf: "center", marginTop: -4 }}
                name="cart"
                type="zocial"
                color="white"
              />
              {addedItems.length ? (
                <Badge
                  status="success"
                  value={addedItems.length}
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        }
        centerComponent={{
          text: "Your Cart",
          style: styles.heading,
        }}
      />
      <View style={{ flex: 11, backgroundColor: "white" }}>
        {addedItems.length > 0 ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: "100%",
                marginTop: 25,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            ></View>
            <FlatList
              data={items}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      width: "90%",
                      height: 130,
                      borderRadius: 15,
                      alignSelf: "center",
                      marginTop: 10,
                      elevation: 5,
                      marginBottom: 10,

                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <View style={{ width: "60%", padding: 20 }}>
                      <Text style={{ color: "#000", fontWeight: "bold" }}>
                        {item.title}
                      </Text>

                      <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        $ {item.price}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={{
                            height: 32,
                            borderRadius: 10,
                            width: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "red",
                            marginTop: 5,
                            marginLeft: -10,
                          }}
                          onPress={() => {
                            removeItem(index);
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                marginRight: 5,
                                fontWeight: "700",
                              }}
                            >
                              Remove
                            </Text>
                            <Icon
                              name="remove"
                              type="font-awesome"
                              color={"white"}
                              size={16}
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            height: 32,
                            backgroundColor: "cyan",
                            height: 32,
                            borderRadius: 10,
                            marginLeft: 10,
                            width: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#e0ad1f",
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                marginRight: 5,
                                fontWeight: "700",
                              }}
                            >
                              Proceed
                            </Text>
                            <Icon
                              name="navigate-next"
                              type="MaterialIcons"
                              color={"white"}
                              size={16}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={{
                        width: "23%",
                        height: "60%",
                        resizeMode: "contain",
                        marginRight: 20,
                        borderRadius: 100,
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={{
                height: windowHeight / 4,
                width: windowWidth - 50,
                resizeMode: "contain",
              }}
              source={require("../assets/emplty_cart.png")}
            />
            <Text style={{ color: "grey", fontSize: 20 }}>
              Your Shopping Cart is Empty
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});
