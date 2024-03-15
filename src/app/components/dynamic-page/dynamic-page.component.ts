import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponentModel } from 'src/app/services/model/dynamic-page.model';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  template: `
    <div class="dynamic-container">
      @for (item of components; track item) {
        <ng-container *ngComponentOutlet="item.componentType" />
      }
    </div>
  `,
  styleUrl: './dynamic-page.component.css',
  imports: [
    CommonModule
  ]
})
export class DynamicPageComponent implements OnInit {

  @Input({ required: true }) components: DynamicComponentModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
