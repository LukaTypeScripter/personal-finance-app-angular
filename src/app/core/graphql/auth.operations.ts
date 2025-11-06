import { gql } from 'apollo-angular';

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      accessToken
      user {
        id
        email
        name
        currency
      }
    }
  }
`;

// Login mutation
export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        id
        email
        name
        currency
      }
    }
  }
`;

// Get current user query
export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      currency
    }
  }
`;
