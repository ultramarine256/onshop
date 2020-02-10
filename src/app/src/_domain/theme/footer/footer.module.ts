import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    /// angular modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  exports: [
    FooterComponent
  ],
  providers: [],
  entryComponents: []
})
export class FooterModule {
}
