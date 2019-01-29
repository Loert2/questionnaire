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
      renderItem={({ item: { node } }) => (
        <ScrollView horizontal={true}>
          <View style={viewEven}>
            <Text style={text}>{node.user.full_name}</Text>
          </View>
          <TouchableOpacity
            style={viewUneven}
            onPress={() => openAnalitic(node.id_ticket, node.user.id_user)}
          >
            <Text style={text}>{node.point}/11</Text>
          </TouchableOpacity>
          <View style={viewEven}>
            <Text style={text}> {node.result} % </Text>
          </View>
          <View style={viewUneven}>
            <Text style={text}>{node.date}</Text>
          </View>
        </ScrollView>
      )}
    />
  );
};

export default FlatListForm;
