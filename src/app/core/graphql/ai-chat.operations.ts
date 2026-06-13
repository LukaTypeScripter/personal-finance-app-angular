import { gql } from 'apollo-angular';

export const SEND_CHAT_MESSAGE_MUTATION = gql`
  mutation SendChatMessage($input: SendChatMessageInput!) {
    sendChatMessage(input: $input) {
      id
      role
      content
      createdAt
      conversationId
    }
  }
`;

export const GET_CHAT_CONVERSATIONS_QUERY = gql`
  query ChatConversations {
    chatConversations {
      id
      title
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHAT_CONVERSATION_QUERY = gql`
  query ChatConversation($id: ID!) {
    chatConversation(id: $id) {
      id
      title
      messages {
        id
        role
        content
        createdAt
      }
    }
  }
`;

export const DELETE_CHAT_CONVERSATION_MUTATION = gql`
  mutation DeleteChatConversation($id: ID!) {
    deleteChatConversation(id: $id)
  }
`;
