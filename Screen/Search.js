import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Icon } from "react-native-elements";
import { Header as HeaderRNE, Badge, Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();
  const [searchProducts, setSearchProducts] = useState("");
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = (text) => {
    setSearchProducts(text);
    fetch(`https://dummyjson.com/products/search?q=${text}`)
      .then((item) => item.json())
      .then((searchData) => {
        setData(searchData.products);
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation " + error.message
        );
        throw error;
      });
  };

  const items = useSelector((state) => state);
  let addedItems = [];
  addedItems = items;

  const listClick = (e) => {
    setSearchProducts(e);
    navigation.navigate("Details", { items: e });
    setData("");
  };

  return (
    <>
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
          <View>
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
          text: "Search Products",
          style: styles.heading,
        }}
      />
      {searchProducts ? (
        <View
          style={{
            height: 90,
            backgroundColor: "#ff6d00",
            justifyContent: "center",
            marginTop: -1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Type anything..."
            style={{
              padding: 10,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 10,
              fontSize: 17,
              fontWeight: "500",
              letterSpacing: 0.5,
              width: windowWidth - 70,
              alignSelf: "center",
            }}
            value={searchProducts}
            onChangeText={(e) => {
              fetchData(e);
            }}
          />
          <TouchableOpacity
            style={{ marginLeft: 13 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Icon name="filter" type="feather" color={"#fff"} size={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            height: 90,
            backgroundColor: "#ff6d00",
            justifyContent: "center",
            marginTop: -1,
          }}
        >
          <TextInput
            placeholder="Type anything..."
            style={{
              padding: 10,
              paddingLeft: 15,
              backgroundColor: "white",
              borderRadius: 10,
              fontSize: 17,
              fontWeight: "500",
              letterSpacing: 0.5,
              width: windowWidth - 20,
              alignSelf: "center",
            }}
            value={searchProducts}
            onChangeText={(e) => {
              fetchData(e);
            }}
          />
          <TouchableOpacity
            style={{ marginLeft: 25 }}
            onPress={() => setModalVisible(!modalVisible)}
          ></TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              height: 225,
              marginTop: 150,
              borderRadius: 10,
              alignSelf: "center",
              width: windowWidth - 100,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#ff6d00",
                height: 50,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginLeft: 20,
                  color: "white",
                }}
              >
                Filter
              </Text>
              <Text style={{ marginRight: 10 }}>
                <Icon
                  name="cancel"
                  size={25}
                  color="white"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </Text>
            </View>
            <Card.Divider />
            <TouchableOpacity
              style={{
                alignItems: "center",
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                let tempList = data.sort((a, b) =>
                  a.title > b.title ? 1 : -1
                );
                setData(tempList);
                setModalVisible(false);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Sort by Name
              </Text>
            </TouchableOpacity>
            <Card.Divider />
            <TouchableOpacity
              style={{
                alignItems: "center",
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                let tempList = data.sort((a, b) =>
                  a.price > b.price ? 1 : -1
                );
                setData(tempList);
                setModalVisible(false);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Sort by Price
              </Text>
            </TouchableOpacity>
            <Card.Divider />
            <TouchableOpacity
              style={{
                alignItems: "center",
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                let tempList = data.sort((a, b) =>
                  a.rating > b.rating ? 1 : -1
                );
                setData(tempList);
                setModalVisible(false);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Sort by Rating
              </Text>
            </TouchableOpacity>

            <Card.Divider />
          </View>
        </View>
      </Modal>

      {searchProducts ? (
        <>
          <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
            Search Results:{" "}
            <Text style={{ color: "#ff6d00" }}>{data.length}</Text>
          </Text>

          <FlatList
            data={data}
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
                  onPress={() => listClick(item)}
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
                    {item.stock < 100
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
          {/* <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 90,
                      width: windowWidth - 30,
                      padding: 10,
                      flex: 1,
                      elevation: 3,
                      borderRadius: 10,
                      alignSelf: "center",
                      backgroundColor: "#fff",
                      marginBottom: 10,
                    }}
                    onPress={() => listClick(item)}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          justifyContent: "center",
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        {item.title}
                      </Text>

                      <Image
                        style={{
                          height: 40,
                          width: 40,
                          resizeMode: "contain",

                          justifyContent: "center",
                        }}
                        source={{ uri: item.thumbnail }}
                      />
                    </View>
                    <Text
                      style={{
                        justifyContent: "flex-start",
                        color: "grey",
                        marginTop: 5,
                      }}
                    >
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          /> */}
        </>
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
            source={require("../assets/search.png")}
          />
          <Text style={{ color: "grey", fontSize: 20 }}>
            Type to search products...
          </Text>
        </View>
      )}
    </>
  );
};
export default Search;

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});



