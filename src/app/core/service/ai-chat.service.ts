import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SEND_CHAT_MESSAGE_MUTATION,
  GET_CHAT_CONVERSATIONS_QUERY,
  GET_CHAT_CONVERSATION_QUERY,
  DELETE_CHAT_CONVERSATION_MUTATION,
} from '@/app/core/graphql/ai-chat.operations';
import {
  ChatConversation,
  ChatMessage,
  SendChatMessageInput,
} from '@/app/core/models/ai-chat.model';

@Injectable({ providedIn: 'root' })
export class AiChatService {
  private apollo = inject(Apollo);

  sendMessage(input: SendChatMessageInput): Observable<ChatMessage & { conversationId: string }> {
    return this.apollo
      .mutate<{ sendChatMessage: ChatMessage & { conversationId: string } }>({
        mutation: SEND_CHAT_MESSAGE_MUTATION,
        variables: { input },
      })
      .pipe(map(result => result.data!.sendChatMessage));
  }

  listConversations(): Observable<ChatConversation[]> {
    return this.apollo
      .query<{ chatConversations: ChatConversation[] }>({
        query: GET_CHAT_CONVERSATIONS_QUERY,
        fetchPolicy: 'network-only',
      })
      .pipe(map(result => result.data?.chatConversations ?? []));
  }

  getConversation(id: string): Observable<ChatConversation> {
    return this.apollo
      .query<{ chatConversation: ChatConversation }>({
        query: GET_CHAT_CONVERSATION_QUERY,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map(result => result.data!.chatConversation));
  }

  deleteConversation(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteChatConversation: boolean }>({
        mutation: DELETE_CHAT_CONVERSATION_MUTATION,
        variables: { id },
      })
      .pipe(map(result => !!result.data?.deleteChatConversation));
  }
}
