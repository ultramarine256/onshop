import { NgModule } from '@angular/core';
import { MaterialThemeModule } from './material';

@NgModule({
  imports: [MaterialThemeModule],
  exports: [MaterialThemeModule],
})
export class ThemeModule {}
