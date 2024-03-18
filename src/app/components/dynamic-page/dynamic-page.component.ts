import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DynamicComponentModel } from 'src/app/services/model/dynamic-page.model';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  template: `
    <div class="dynamic-container">
      @for (item of components; track item) {
        <ng-template *ngComponentOutlet="item.componentType; inputs: item.inputs" />
      }
    </div>
  `,
  styleUrl: './dynamic-page.component.css',
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'ngSkipHydration': 'true' }
})
export class DynamicPageComponent implements OnInit {

  @Input({ required: true }) components: DynamicComponentModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
