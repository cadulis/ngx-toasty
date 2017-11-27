// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/cadulis/ngx-toasty

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ToastData } from './toasty.service';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'ng2-toast',
  template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme]" (click)="click($event)">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title" [innerHTML]="toast.title | safeHtml"></span>
                <br *ngIf="toast.title && toast.msg" />
                <span *ngIf="toast.msg" class="toast-msg" [innerHtml]="toast.msg | safeHtml"></span>
            </div>
        </div>`
})
export class ToastComponent {

  @Input() toast: ToastData;
  @Output('clickToast') clickToastEvent = new EventEmitter();
  @Output('closeToast') closeToastEvent = new EventEmitter();

  /**
   * Event handler invokes when user clicks on toast.
   * This method emit new event into ToastyContainer to process click on toast.
   */
  click($event: any) {
    $event.preventDefault();
    this.clickToastEvent.next(this.toast);
  }

  /**
   * Event handler invokes when user clicks on close button.
   * This method emit new event into ToastyContainer to close it.
   */
  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);
  }
}
