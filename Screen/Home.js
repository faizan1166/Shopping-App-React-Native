import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Badge, Icon, Button } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Header as HeaderRNE } from "react-native-elements";
import { useSelector } from "react-redux";
import Search from "./Search";

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const getData = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const Details = (item) => {
    navigation.navigate("Details", {
      items: item,
    });
  };

  const items = useSelector((state) => state);
  let addedItems = [];
  addedItems = items;

  return (
    <>
      <HeaderRNE
        backgroundColor="#ff6d00"
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
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("Cart")}
            >
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
          text: "Products",
          style: styles.heading,
        }}
      />

      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={{
                elevation: 5,
                height: 300,
                width: windowWidth / 2.1,
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 5,
                alignSelf: "center",
                flex: 1,
                marginHorizontal: 5,
                borderRadius: 10,
              }}
              onPress={() => Details(item)}
            >
              <Image
                style={{
                  height: "48%",
                  marginTop: 10,
                  alignSelf: "center",
                  width: "80%",
                  resizeMode: "contain",
                  borderRadius: 100,
                }}
                source={{ uri: item.thumbnail }}
              />
              <Text
                style={{
                  color: "#000",
                  justifyContent: "center",
                  alignSelf: "center",
                  fontWeight: "bold",
                  marginTop: 10,
                  fontSize: 15,
                }}
              >
                {item.title.length > 20
                  ? item.title.slice(0, 20) + "...."
                  : item.title}
              </Text>
              <Text style={{ color: "#000", justifyContent: "center" }}>
                {item.description.length > 30
                  ? item.description.slice(0, 30) + "...."
                  : item.description}
              </Text>
              <Text
                style={{
                  color: "red",
                  justifyContent: "center",
                  fontWeight: "500",
                }}
              >
                {item.stock < 100 ? "Only " + item.stock + " items left" : null}
              </Text>
              <Text>{item.discountPercentage + "% Off"}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                  marginHorizontal: 5,
                  marginTop: 10,
                }}
              >
                {/* <View style={{ flexDirection: "row" }}> */}
                <Text
                  style={{
                    color: "green",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {"$ " + item.price}
                </Text>
                {/* <Text
                  style={{
                    color: "green",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {"$ " + item.discountPercentage}
                </Text></View> */}

                {/* <Text style={{ color: "grey", justifyContent: "center" }}>
                  {item.rating}
                </Text> */}
                <View style={{ flexDirection: "row" }}>
                  <Icon name={"star"} color="orange" size={20} />
                  <Text
                    style={{
                      fontSize: 16,
                      color: "black",
                    }}
                  >
                    {item.rating}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});
