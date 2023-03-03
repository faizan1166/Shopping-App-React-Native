import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import { ImageSlider } from "react-native-image-slider-banner";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Header as HeaderRNE, HeaderProps, Badge } from "react-native-elements";
// import ImageSlider from 'react-native-image-slider';

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/action/Actions";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const images = route.params.items.images;
  var cal2 =
    route.params.items.price -
    (route.params.items.price * route.params.items.discountPercentage) / 100;

  const getData = () => {
    fetch(
      `https://dummyjson.com/products/category/${route.params.items.category}`
    )
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

  const dispatch = useDispatch();
  const addItem = (item) => {
    dispatch(addItemToCart(item));
  };
  const items = useSelector((state) => state);
  let addedItems = [];
  addedItems = items;

  return (
    <>
      <ScrollView>
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
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
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
                    containerStyle={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          }
          centerComponent={{
            text: route.params.items.title,
            style: styles.heading,
          }}
        />
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Card
            containerStyle={{
              height: "100%",
              width: "100%",
              alignSelf: "center",
            }}
          >
            {route.params.items.images.length > 1 ? (
              <>
                <ImageSlider
                  activeIndicatorStyle={{ backgroundColor: "orange" }}
                  data={[
                    { img: route.params.items.images[0] },
                    { img: route.params.items.images[1] },
                    { img: route.params.items.images[2] },
                    { img: route.params.items.images[3] },
                    { img: route.params.items.images[4] },
                  ]}
                />
              </>
            ) : (
              <ImageSlider
                activeIndicatorStyle={{ backgroundColor: "orange" }}
                data={[{ img: route.params.items.images[0] }]}
              />
            )}
            <Text style={{ marginBottom: 10, fontSize: 20 }}>
              {route.params.items.title}
            </Text>

            <Text style={{ marginBottom: 10 }}>
              {route.params.items.description}
            </Text>

            <Card.Divider />
            <Text
              style={{
                color: "red",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              {route.params.items.stock < 100
                ? "Only " + route.params.items.stock + " items left"
                : null}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Icon name={"star"} color="orange" size={20} />
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                {route.params.items.rating}
              </Text>
            </View>
            <Text style={{ marginTop: 10 }}>
              {route.params.items.discountPercentage + "% Off"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: "grey",
                  fontSize: 17,
                  marginTop: 15,
                }}
              >
                {"$" + route.params.items.price}
              </Text>

              <Text
                style={{
                  fontSize: 19,
                  color: "green",
                  marginLeft: 5,
                  marginTop: 15,
                }}
              >
                {cal2.toFixed(2) + " $"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15, color: "gray", marginTop: 7 }}>
                Brand: {route.params.items.brand}
              </Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  borderRadius: 20,
                  width: windowWidth / 3,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ff6d00",
                  marginTop: 5,
                  marginLeft: 5,
                }}
                onPress={() => {
                  addItem(route.params.items);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    style={{ marginRight: 8, alignSelf: "center" }}
                    name="cart"
                    type="zocial"
                    size={20}
                    color="#fff"
                  />
                  <Text style={{ color: "#fff", alignSelf: "center" }}>
                    Add To Cart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <Text
          style={{
            fontSize: 22,
            marginTop: 20,
            marginHorizontal: 10,
            color: "#000",
          }}
        >
          More realated products -{" "}
          <Text style={{ fontWeight: "bold" }}>
            {route.params.items.category}
          </Text>
        </Text>

        <FlatList
          data={products}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={{
                  height: 320,
                  marginLeft: 15,
                  width: windowWidth / 2.1,
                  backgroundColor: "#fff",
                  marginTop: 10,
                  padding: 5,
                  alignSelf: "center",
                  marginHorizontal: 3,

                  borderRadius: 10,
                  marginBottom: 35,
                  elevation: 5,
                }}
                onPress={() => Details(item)}
              >
                <Image
                  style={{
                    height: 145,
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
                    marginBottom: 10,
                  }}
                >
                  {item.stock > 50
                    ? "Only " + item.stock + " items left"
                    : null}
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
      </ScrollView>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});
