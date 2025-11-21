/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { LoaderService } from './core/services/loader.service';
import { MessageService } from './core/services/message.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  const loaderStub: Partial<LoaderService> = {
    loading$: of(false),
  };
  const messageStub: Partial<MessageService> = {
    message$: of(null),
    clear: () => undefined,
    show: () => undefined,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: LoaderService, useValue: loaderStub },
        { provide: MessageService, useValue: messageStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose a loading observable', () => {
    expect(fixture.componentInstance.loading$).toBeTruthy();
  });
});
