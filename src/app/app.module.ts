import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { APP_BASE_HREF } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';


function init(http: HttpClient, translate: TranslateService) {
  return () => forkJoin([
    of({}),
    translate.use(localStorage.getItem('language') || 'en')
  ]);
}


@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    TranslateModule.forRoot()
  ],
  providers: [
    MovieService,

    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [HttpClient, TranslateService],
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: () => PlatformHelper.getAppBasePath()
    },


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
