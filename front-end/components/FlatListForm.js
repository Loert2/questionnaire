import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";

const FlatListForm = ({ table, openAnalitic, viewEven, viewUneven, text }) => {
  return (
    <FlatList
      data={table}
      renderItem={({ item }) => (
        <ScrollView horizontal={true}>
          <View style={viewEven}>
            <Text style={text}>{item.node.user.full_name}</Text>
          </View>
          <TouchableOpacity
            style={viewUneven}
            onPress={openAnalitic({
              item: { node: { user: { id_user }, id_ticket } }
            })}
          >
            <Text style={text}>{item.node.point}/11</Text>
          </TouchableOpacity>
          <View style={viewEven}>
            <Text style={text}> {item.node.result} % </Text>
          </View>
          <View style={viewUneven}>
            <Text style={text}>{item.node.date}</Text>
          </View>
        </ScrollView>
      )}
    />
  );
};

export default FlatListForm;
