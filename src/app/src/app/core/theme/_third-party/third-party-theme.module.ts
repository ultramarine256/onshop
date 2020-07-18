import { ExtendedModule, FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [ExtendedModule, FlexModule, FlexLayoutModule, NgxPaginationModule],
  exports: [ExtendedModule, FlexModule, FlexLayoutModule, NgxPaginationModule],
})
export class ThirdPartyThemeModule {}
