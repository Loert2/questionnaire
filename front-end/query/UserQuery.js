import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const USER = gql`
  query User {
    user {
      id_user
    }
  }
`;

const user = graphql(USER);
export default user;
