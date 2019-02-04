import { graphql } from "react-apollo";
import gql from "graphql-tag";

const RESULT_USER = gql`
  query ResultUser {
    user {
      id_user
      role
      result_user {
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
  }
`;

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

export const res_data = graphql(RESULT_DATA);

export const res_user = graphql(RESULT_USER);
