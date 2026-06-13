import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { AiChatService } from './ai-chat.service';

describe('AiChatService', () => {
  it('sends a message and returns the assistant reply', (done) => {
    const apollo = {
      mutate: jasmine.createSpy().and.returnValue(
        of({ data: { sendChatMessage: { id: 'm1', role: 'assistant', content: 'hi there', createdAt: '', conversationId: 'c1' } } })),
    };
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), AiChatService, { provide: Apollo, useValue: apollo }],
    });
    const svc = TestBed.inject(AiChatService);
    svc.sendMessage({ message: 'hi' }).subscribe(reply => {
      expect(reply.content).toBe('hi there');
      expect(reply.role).toBe('assistant');
      done();
    });
  });

  it('lists conversations', (done) => {
    const apollo = {
      query: jasmine.createSpy().and.returnValue(
        of({ data: { chatConversations: [{ id: 'c1', title: 'Hi', createdAt: '', updatedAt: '' }] } })),
    };
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), AiChatService, { provide: Apollo, useValue: apollo }],
    });
    const svc = TestBed.inject(AiChatService);
    svc.listConversations().subscribe(list => {
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('c1');
      done();
    });
  });
});
