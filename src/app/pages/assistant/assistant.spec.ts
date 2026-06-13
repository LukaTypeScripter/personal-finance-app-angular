import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Assistant } from './assistant';
import { AiChatService } from '@/app/core/service/ai-chat.service';

describe('Assistant', () => {
  function setup(service: Partial<AiChatService>) {
    TestBed.configureTestingModule({
      imports: [Assistant],
      providers: [
        provideZonelessChangeDetection(),
        provideTranslateService({ fallbackLang: 'en' }),
        { provide: AiChatService, useValue: service },
      ],
    });
    return TestBed.createComponent(Assistant).componentInstance;
  }

  it('does not send blank messages', () => {
    const sendMessage = jasmine.createSpy();
    const cmp = setup({ sendMessage } as any);
    cmp.draft.set('   ');
    cmp.send();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('appends user and assistant messages on success', () => {
    const cmp = setup({
      sendMessage: () => of({ id: 'm1', role: 'assistant', content: 'reply', createdAt: '', conversationId: 'c1' }),
    } as any);
    cmp.draft.set('hello');
    cmp.send();
    const roles = cmp.messages().map((m: any) => m.role);
    expect(roles).toEqual(['user', 'assistant']);
    expect(cmp.loading()).toBe(false);
  });

  it('shows an error banner when send fails', () => {
    const cmp = setup({
      sendMessage: () => throwError(() => new Error('boom')),
    } as any);
    cmp.draft.set('hello');
    cmp.send();
    expect(cmp.error()).toBeTruthy();
    expect(cmp.loading()).toBe(false);
  });

  it('reuses the conversationId returned by the first reply on the next send', () => {
    const sendMessage = jasmine.createSpy().and.returnValue(
      of({ id: 'm1', role: 'assistant', content: 'reply', createdAt: '', conversationId: 'c1' }));
    const cmp = setup({ sendMessage } as any);
    cmp.draft.set('first'); cmp.send();
    cmp.draft.set('second'); cmp.send();
    expect(sendMessage.calls.argsFor(1)[0].conversationId).toBe('c1');
  });
});
