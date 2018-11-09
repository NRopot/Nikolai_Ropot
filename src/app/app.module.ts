import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ErrorComponent } from './error/error.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CookieService } from 'ngx-cookie-service';
import { LoadingComponent } from './loading/loading.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    BrowserModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    UserInfoComponent,
    UserEditComponent,
    LoadingComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
