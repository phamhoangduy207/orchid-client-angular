import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  CORPORATE_THEME,
  COSMIC_THEME,
  DARK_THEME,
  DEFAULT_THEME,
  NbThemeModule,
} from '@nebular/theme';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesModule } from './components/pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
        ).providers,
      ],
    };
  }
}
