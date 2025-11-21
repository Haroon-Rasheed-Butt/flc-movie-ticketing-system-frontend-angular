import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../services/message.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private readonly messages: MessageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const message =
          error.error?.message ||
          error.message ||
          'Server error. Please try again later.';
        this.messages.show(message, 'error', 5000);
        return throwError(() => error);
      })
    );
  }
}
