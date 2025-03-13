import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  query: string = '';
  movies: any[] = [];
  popularMovies: any[] = [];
  visibleMovies: any[] = [];
  currentSlide: number = 0;
  slideInterval: any;
  genres: any[] = [];
  selectedGenre: string = '';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  onSearch(): void {
    if (this.query) {
      this.movieService.searchMovies(this.query).subscribe((data) => {
        this.movies = data.results;
      });
    }
  }

  getAsset(url: string): string {
    return PlatformHelper.getAssetUrl() + url;
  }

  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results;
      this.updateVisibleMovies();
    });
  }



  updateVisibleMovies(): void {
    const startIndex = this.currentSlide * 5;
    this.visibleMovies = this.popularMovies.slice(startIndex, startIndex + 5);
  }

  moveSlide(direction: string): void {
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide + 1) % Math.ceil(this.popularMovies.length / 5);
    } else if (direction === 'prev') {
      this.currentSlide = (this.currentSlide - 1 + Math.ceil(this.popularMovies.length / 5)) % Math.ceil(this.popularMovies.length / 5);
    }
    this.updateVisibleMovies();
  }

  moveToSlide(index: number): void {
    this.currentSlide = index;
    this.updateVisibleMovies();
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.moveSlide('next');
    }, 5000);
  }
}
