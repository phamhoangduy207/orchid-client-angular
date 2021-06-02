import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule,
  NbSidebarModule,
  NbIconModule,
  NbSelectModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarService,
  NbActionsModule,
  NbUserModule,
  NbSearchModule,
  NbContextMenuModule,
  NbSpinnerModule,
  NbButtonModule,
  NbTooltipModule,
  NbDialogModule,
} from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { LayoutService } from 'src/app/services/layout.service';
import { OrchidComponent } from './orchid/orchid.component';
import { FeedsComponent } from './feeds/feeds.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { UploadComponent } from './upload/upload.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    PagesComponent,
    OrchidComponent,
    FeedsComponent,
    CkeditorComponent,
    DialogsComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CKEditorModule,
    FormsModule,
    NbDialogModule.forChild(),
    ReactiveFormsModule,
    Ng2SmartTableModule,

    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),

    NbLayoutModule,
    NbCardModule,
    NbSidebarModule,
    NbSelectModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbSearchModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbButtonModule,
    NbTooltipModule,

    MatCardModule,

  ],
  providers: [NbSidebarService, LayoutService, OrchidComponent, FeedsComponent, OrchidComponent],

  entryComponents: [
    CkeditorComponent,
    UploadComponent
  ],
})
export class PagesModule {}
