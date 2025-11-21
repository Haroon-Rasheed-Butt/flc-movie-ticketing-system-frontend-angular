import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './core/services/loader.service';
import { MessageService, UiMessage } from './core/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean>;
  message$: Observable<UiMessage | null>;

  constructor(
    private readonly loader: LoaderService,
    private readonly messages: MessageService
  ) {
    this.loading$ = this.loader.loading$;
    this.message$ = this.messages.message$;
  }

  clearMessage(): void {
    this.messages.clear();
  }
}
