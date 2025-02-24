import { Component } from '@angular/core';

@Component({
  selector:  'movie-catalog', // 'app-root',
  template:  '<router-outlet></router-outlet>', // <-- також замінюємо стандартний вміст
})
export class AppComponent {
  title = 'movie-catalog';
}
