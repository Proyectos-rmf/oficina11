import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy  {
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(private UTIL: UtilService, public mediaObserver: MediaObserver) {}

  ngOnInit(): void {
   // tslint:disable-next-line: deprecation
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

}
