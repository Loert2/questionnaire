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
import FlatListForm from "./FlatListForm";

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
    const { data, id_user, role, result_user } = this.props;
    const { container, viewEven, viewUneven, text } = styles;
    const loading = data && data.loading;
    const result = data && data.result && data.result.edges;
    console.log("result", result_user);
    return (
      <View style={styles.container}>
        {!loading && !openAn ? (
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
              openAnalitic={this.openAnalitic}
              viewEven={viewEven}
              viewUneven={viewUneven}
              text={text}
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
            id_user
            full_name
          }
        }
      }
    }
  }
`;

const res_data = graphql(RESULT_DATA);

// const RESULT_USER = gql`
//   query ResultUser {
//     user {
//       role
//       result_user {
//         edges {
//           node {
//             point
//             result
//             date
//             user {
//               full_name
//             }
//           }
//         }
//       }
//     }
//   }
// `;
//
// const res_user = graphql(RESULT_USER);

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
