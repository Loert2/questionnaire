import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import ResultForm from "../components/ResultForm";
import user from "../query/UserQuery";
import { Icon } from "expo";
import { res_user } from "../query/ResultUser";

class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_ticket: null,
      idUser: null,
      openAn: false
    };
    this.openAnalitic = this.openAnalitic.bind(this);
    this.exitAnalitic = this.exitAnalitic.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ exitAnalitic: this.exitAnalitic });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    data.refetch();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View>
          {navigation.getParam("openAn") && (
            <TouchableOpacity
              style={styles.exitBtn}
              onPress={navigation.getParam("exitAnalitic")}
            >
              <Icon.Ionicons
                name={"md-arrow-back"}
                size={30}
                color={"#000000"}
              />
            </TouchableOpacity>
          )}
        </View>
      ),
      headerStyle: {
        backgroundColor: "#ffff4f"
      },
      gesturesEnabled: false
    };
  };

  async openAnalitic(id_ticket, id_user) {
    await this.setState({ id_ticket, idUser: id_user, openAn: true });
    await this.props.navigation.setParams({ openAn: this.state.openAn });
  }

  async exitAnalitic() {
    await this.setState({ openAn: false });
    await this.props.navigation.setParams({ openAn: this.state.openAn });
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
    const { openAn, id_ticket, idUser } = this.state;
    const { data } = this.props;
    const { container, textError, lineAngular, viewError } = styles;
    const loading = data && data.loading;
    const user = data && data.user;
    const id_user = user && user.id_user;
    const role = user && user.role;
    const result_user = user && user.result_user.edges;
    return (
      <View style={container}>
        {user !== null ? (
          <View>
            {!loading && (
              <ResultForm
                id_user={id_user}
                role={role}
                result_user={result_user}
                openAnalitic={this.openAnalitic}
                id_ticket={id_ticket}
                idUser={idUser}
                openAn={openAn}
              />
            )}
          </View>
        ) : (
          <Text style={textError}>
            Для просмотра результатов войдите в систему
          </Text>
        )}
        <View style={lineAngular} />
      </View>
    );
  }
}

export default compose(res_user)(ResultScreen);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  textError: {
    marginTop: 150,
    color: "#000000",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "space-mono"
  },
  lineAngular: {
    transform: [{ rotate: "-55deg" }],
    position: "absolute",
    marginTop: 450,
    marginLeft: 240,
    paddingTop: 20,
    paddingBottom: 20,
    width: 250,
    backgroundColor: "#ffff4f"
  },
  exitBtn: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24
  }
});
