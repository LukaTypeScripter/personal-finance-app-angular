import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AiChatService } from '@/app/core/service/ai-chat.service';
import { ChatMessage } from '@/app/core/models/ai-chat.model';

@Component({
  selector: 'app-assistant',
  imports: [FormsModule, TranslateModule],
  templateUrl: './assistant.html',
  styleUrl: './assistant.scss',
})
export class Assistant {
  private aiChat = inject(AiChatService);

  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private conversationId: string | undefined;

  send(): void {
    const text = this.draft().trim();
    if (!text || this.loading()) return;

    this.error.set(null);
    this.loading.set(true);
    this.messages.update(list => [
      ...list,
      { id: `local-${list.length}`, role: 'user', content: text, createdAt: new Date().toISOString() },
    ]);
    this.draft.set('');

    this.aiChat.sendMessage({ conversationId: this.conversationId, message: text }).subscribe({
      next: reply => {
        this.conversationId = reply.conversationId ?? this.conversationId;
        this.messages.update(list => [...list, reply]);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('The assistant is unavailable right now. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
