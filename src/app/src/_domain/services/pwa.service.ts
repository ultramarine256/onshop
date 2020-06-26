import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

import { PromptComponent } from '@shared/prompt/prompt.component';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;

  constructor(private bottomSheet: MatBottomSheet, private platform: Platform) {}

  initPwaPrompt() {
    if (localStorage.getItem('prompt')) {
      return;
    }
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = 'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
    localStorage.setItem('prompt', 'true');
  }

  openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } });
      });
  }
}
