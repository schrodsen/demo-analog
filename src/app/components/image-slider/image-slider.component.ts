import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, makeStateKey, signal } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImageSliderModel, ImageTagModel } from './image-slider.model';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { load } from '../../pages/index.server'
import { PlatformService } from '../../services/platform.service';
import { TransferState } from '@angular/platform-browser';
import { LoadingComponent } from '../loading/loading.component';

const STATE_KEY_IMAGES = makeStateKey<ImageTagModel[]>('images');

@Component({
  selector: 'image-slider',
  standalone: true,
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  imports: [
    CommonModule,
    LoadingComponent,
  ],
})
export class ImageSliderComponent implements OnInit {

  @Input() guid: string = '';

  data = toSignal(injectLoad<typeof load>(), { requireSync: true });

  images: ImageTagModel[] = [];
  isLoading = signal<boolean>(true);

  private httpClient = inject(HttpClient);
  private platform = inject(PlatformService);
  private transferState = inject(TransferState);

  // add dummy
  myImages = signal<ImageTagModel[]>([]);
  myImage = signal<ImageTagModel>({} as ImageTagModel);
  activeIdx: number = 0;
  activeImage = new BehaviorSubject<ImageTagModel | null>(null)
  activeImg$ = this.activeImage as Observable<ImageTagModel | null>;

  constructor() {
  }

  ngOnInit() {

    if (this.platform.isBrowser) {
    //if (this.platform.isServer) {
      const sliderModel = this.data()?.components.find(x => x.componentId === this.guid)?.data as ImageSliderModel;
      for (let image of sliderModel.images) {
        image.url = image.url + '?w=960&h=540'
      }

      console.log('ng on init', sliderModel);
      this.myImages.set(sliderModel.images);
      this.myImage.set(sliderModel.images[0]);
      this.isLoading.set(false);
    }
    // if (this.platform.isServer) {
    //   this.getImages();
    // }

    // if (this.platform.isBrowser) {
    //   console.log('browser', this.images);
    //   const tmp = this.transferState.get(STATE_KEY_IMAGES, []) as ImageTagModel[];
    //   this.images = tmp;
    //   this.myImages.next(tmp);
    //   this.activeImage.next(tmp[0]);
    //   console.log('after get', tmp);
    // }
  }

  onNext() {
    //if (this.activeIdx < this.images.length - 1) {
    if (this.activeIdx < this.myImages().length - 1) {
      this.activeIdx++;
      //this.activeImage.next(this.images[this.activeIdx]);
      this.myImage.set(this.myImages()[this.activeIdx]);
    }
  }

  onPrevious() {
    if (this.activeIdx > 0) {
      this.activeIdx--;
      //this.activeImage.next(this.images[this.activeIdx]);
      this.myImage.set(this.myImages()[this.activeIdx]);
    }
  }

  onSelection(i: number) {
    //this.activeImage.next(this.images[i]);
    this.myImage.set(this.myImages()[i]);
  }

  getImages() : void {

    // const serverApiUrl = 'https://localhost:5173/api/v1/slider/kuga';
    // this.httpClient.get<string>(serverApiUrl).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   }
    // });

    const apiUrl = `https://vhdev.proxy.beeceptor.com/slider/${this.guid}`;

    this.httpClient.get<ImageSliderModel>(apiUrl)
      .pipe(
        map((responseModel) => {
          for (let image of responseModel.images) {
            image.url = image.url + '?w=960&h=540'
          }
          if (responseModel.images.length > 0) {
            this.myImages.set(responseModel.images);
            this.activeImage.next(this.myImages()[0]);
          }
          this.isLoading.set(false);
          return responseModel.images;
        }),
        catchError((err) => {
          console.log('err', err);
          return EMPTY;
      }))
      .subscribe({
        next: (images) => {
          //this.transferState.set(STATE_KEY_IMAGES, images);
        }
      });
  }
}
