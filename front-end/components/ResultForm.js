import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import FlatListForm from "./FlatListForm";
import AnaliticForm from "./AnaliticForm";
import { res_data } from "../query/ResultUser";

class ResultForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    data.refetch();
  }

  column = [
    {
      full_name: "ФИО",
      point: "Ответы",
      result: "Результат",
      date: "Дата"
    }
  ];

  render() {
    const {
      data,
      id_user,
      role,
      result_user,
      id_ticket,
      idUser,
      openAn,
      openAnalitic
    } = this.props;
    const { viewEven, viewUneven, text } = styles;
    const loading = data && data.loading;
    const result = data && data.result && data.result.edges;
    return (
      <View>
        {!loading && (
          <View>
            {openAn === false ? (
              <View>
                <FlatList
                  data={this.column}
                  renderItem={({ item }) => (
                    <ScrollView horizontal={true}>
                      <View style={styles.viewEven}>
                        <Text style={text}>{item.full_name}</Text>
                      </View>
                      <View style={viewUneven}>
                        <Text style={text}>{item.point}</Text>
                      </View>
                      <View style={viewEven}>
                        <Text style={text}> {item.result}</Text>
                      </View>
                      <View style={viewUneven}>
                        <Text style={text}>{item.date}</Text>
                      </View>
                    </ScrollView>
                  )}
                />
                <FlatListForm
                  table={role === "admin" ? result : result_user}
                  openAnalitic={openAnalitic}
                  viewEven={viewEven}
                  viewUneven={viewUneven}
                  text={text}
                />
              </View>
            ) : (
              <AnaliticForm id_user={idUser} id_ticket={id_ticket} />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default compose(res_data)(ResultForm);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center"
  },
  viewEven: {
    backgroundColor: "#ffff4f",
    height: 70,
    width: 100,
    margin: "auto",
    justifyContent: "center"
  },
  viewUneven: {
    height: 70,
    width: 100,
    margin: "auto",
    justifyContent: "center"
  }
});
