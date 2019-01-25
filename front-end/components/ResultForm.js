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
import AnaliticForm from "./AnaliticForm";

class ResultForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_ticket: null,
      idUser: null,
      openAn: false
    };
    this.openAnalitic = this.openAnalitic.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
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
  openAnalitic(id_ticket, id_user) {
    this.setState({ id_ticket, idUser: id_user, openAn: true });
  }

  render() {
    const { id_ticket, idUser, openAn } = this.state;
    const { data, id_user } = this.props;
    const loading = data && data.loading;
    const result = data && data.result && data.result.edges;
    return (
      <View style={styles.container}>
        {!loading && !openAn ? (
          <View>
            <FlatList
              data={this.column}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}>{item.full_name}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.point}</Text>
                  </View>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}> {item.result}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.date}</Text>
                  </View>
                </ScrollView>
              )}
            />
            <FlatList
              data={result}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  {id_user === idUser ? (
                    <TouchableOpacity
                      style={styles.viewEven}
                      onPress={this.openAnalitic({
                        item: { node: { id_ticket } },
                        item: { node: { id_user } }
                      })}
                    >
                      <Text style={styles.text}>
                        {item.node.user.full_name}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.viewEven}>
                      <Text style={styles.text}>
                        {item.node.user.full_name}
                      </Text>
                    </View>
                  )}
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.node.point}/11</Text>
                  </View>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}> {item.node.result} % </Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.node.date}</Text>
                  </View>
                </ScrollView>
              )}
            />
          </View>
        ) : (
          <AnaliticForm id_user={id_user} id_ticket={id_ticket} />
        )}
      </View>
    );
  }
}

const RESULT_DATA = gql`
  query Result {
    result {
      edges {
        node {
          id_ticket
          point
          result
          date
          user {
            full_name
          }
        }
      }
    }
  }
`;

const res_data = graphql(RESULT_DATA);

export default compose(res_data)(ResultForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
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
