import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type MessageLevel = 'info' | 'success' | 'error';

export interface UiMessage {
  text: string;
  level: MessageLevel;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly messageSubject = new BehaviorSubject<UiMessage | null>(null);
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  get message$(): Observable<UiMessage | null> {
    return this.messageSubject.asObservable();
  }

  show(text: string, level: MessageLevel = 'info', duration = 4000): void {
    this.messageSubject.next({ text, level });
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    if (duration > 0) {
      this.hideTimeout = setTimeout(() => this.clear(), duration);
    }
  }

  clear(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.messageSubject.next(null);
  }
}
