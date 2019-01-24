import gql from "graphql-tag";
const RESULT_DATA = gql`
  query Result {
    result {
      edges {
        node {
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

const USER = gql`
  query User {
    user {
      id_user
    }
  }
`;

export { RESULT_DATA, USER };
