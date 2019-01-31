import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Dimensions
} from "react-native";
import TestForm from "../components/TestForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Icon } from "expo";
import user from "../query/UserQuery";

class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_ticket: null,
      visible: false,
      id_answer_user: 0
    };
    this.startBtn = this.startBtn.bind(this);
    this.endBtn = this.endBtn.bind(this);
    this.exitModalBtn = this.exitModalBtn.bind(this);
    this.exitConfirmBtn = this.exitConfirmBtn.bind(this);
    this.idAnsUsCollbeck = this.idAnsUsCollbeck.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={navigation.getParam("exitModalBtn")}
        >
          <Icon.Ionicons name={"md-exit"} size={40} color={"#000000"} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#ffff4f"
      },
      headerLeft: null,
      gesturesEnabled: false
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ exitModalBtn: this.exitModalBtn });
  }

  startBtn() {
    var random = Math.round(Math.random() * (15 - 1) + 1);
    console.log(random);
    this.setState({
      id_ticket: random
    });
  }

  endBtn() {
    this.setState({
      id_ticket: null
    });
  }

  exitModalBtn() {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    });
  }

  exitConfirmBtn() {
    const { data, out, navigation } = this.props;
    const { id_ticket } = this.state;
    this.exitModalBtn();
    if (id_ticket !== null) {
      this.endBtn();
    } else {
      out({}).then(res => {
        navigation.push("CustomDrawer");
        data.refetch();
      });
    }
  }

  idAnsUsCollbeck(id_answer_user) {
    this.setState({
      id_answer_user
    });
  }

  render() {
    const { id_ticket, visible, id_answer_user } = this.state;
    const { navigation, data } = this.props;
    const id_user = data && data.user && data.user.id_user;
    const {
      container,
      startBtn,
      buttonText,
      text,
      exitConfirmBtn,
      exitRejectBtn,
      modal,
      transparent,
      modalText,
      textContainer,
      lineAngular,
      startContainer
    } = styles;
    return (
      <View style={[container, visible && transparent]}>
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={modal}>
            <Text style={modalText}>
              Вы уверены что хотите выйти{" "}
              {id_ticket === null ? (
                <Text style={modalText}>из системы</Text>
              ) : (
                <Text style={modalText}>из теста</Text>
              )}
              ?
            </Text>

            <ScrollView horizontal={true}>
              <TouchableOpacity
                style={exitConfirmBtn}
                onPress={this.exitConfirmBtn}
              >
                <Text style={modalText}>Да</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={exitRejectBtn}
                onPress={this.exitModalBtn}
              >
                <Text style={modalText}>Нет</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
        {id_ticket === null ? (
          <View style={startContainer}>
            <View style={textContainer}>
              <Text style={text}>
                В тесте представлены экзаменационные билеты для проверки знаний
                по электробезопасности.
              </Text>
              <Text style={text}>Билет выбирается случайным образом.</Text>
            </View>
            <TouchableOpacity style={startBtn} onPress={this.startBtn}>
              <Text style={buttonText}>Начать тест</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TestForm
            id_ticket={id_ticket}
            id_user={id_user}
            endBtn={this.endBtn}
            modalOpen={visible}
            idAnsUsCollbeck={this.idAnsUsCollbeck}
            id_answer_user={id_answer_user}
          />
        )}
        <View style={lineAngular} />
      </View>
    );
  }
}

const SIGN_OUT_MUTATION = gql`
  mutation SignOut($inputOut: UserSignOutInput!) {
    UserSignOut(input: $inputOut) {
      error
    }
  }
`;
const out = graphql(SIGN_OUT_MUTATION, {
  props: ({ mutate }) => ({
    out: inputOut => mutate({ variables: { inputOut } })
  })
});

export default compose(
  user,
  out
)(TestScreen);

const styles = StyleSheet.create({
  startBtn: {
    backgroundColor: "#ffff4f",
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 85,
    marginRight: 85,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24
  },
  text: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "space-mono"
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "space-mono"
  },
  exitBtn: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24
  },
  modalText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 24,
    padding: 10
  },
  exitRejectBtn: {
    backgroundColor: "#ffff4f",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 47,
    paddingRight: 47,
    borderRadius: 10
  },
  exitConfirmBtn: {
    backgroundColor: "#FF0000",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 47,
    paddingRight: 47,
    borderRadius: 10
  },
  modal: {
    backgroundColor: "#fff",
    height: 160,
    width: 300,
    marginTop: 200,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 10
  },
  transparent: {
    opacity: 0.7,
    backgroundColor: "#000000"
  },
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  textContainer: {
    paddingLeft: 9,
    paddingRight: 9
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
  startContainer: {
    borderRadius: 10,
    borderWidth: 10,
    borderColor: "#ffff4f",
    backgroundColor: "#f8f32b",
    marginTop: 95,
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15
  }
});
