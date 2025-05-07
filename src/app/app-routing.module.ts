import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PlatformHelper } from  '@natec/mef-dev-platform-connector';

const routes: Routes = PlatformHelper.updatePluginsRoutes([
  {
    path: '',
    children: [
      {
        path: '',
        component: MovieSearchComponent
      },
      {
        path: 'movie/:id',
        component: MovieDetailsComponent
      }
    ]
  }
]);


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
