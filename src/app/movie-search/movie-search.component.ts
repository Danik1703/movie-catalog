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
  activeTab: number = 0; 

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getGenres();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); 
    }
  }

  getAsset(url: string): string {
    return PlatformHelper.getAssetUrl() + url;
  }

  onSearch(): void {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query).subscribe((data) => {
        this.movies = data.results;
      });
    }
  }

  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results;
      this.updateVisibleMovies();
    });
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe((res) => {
      this.genres = res.genres;
    });
  }

  filteredMovies(): any[] {
    if (!this.query.trim()) return this.popularMovies;
    return this.popularMovies.filter((movie) =>
      movie.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  filteredMoviesByGenre(): any[] {
    if (!this.selectedGenre) return this.popularMovies;
    return this.popularMovies.filter((movie) =>
      movie.genre_ids.includes(+this.selectedGenre)
    );
  }

  updateVisibleMovies(): void {
    const startIndex = this.currentSlide * 5;
    this.visibleMovies = this.popularMovies.slice(startIndex, startIndex + 5);
  }

  moveSlide(direction: string): void {
    const maxSlide = Math.ceil(this.popularMovies.length / 5);
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide + 1) % maxSlide;
    } else if (direction === 'prev') {
      this.currentSlide = (this.currentSlide - 1 + maxSlide) % maxSlide;
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

  onGenreSelect(genreId: string): void {
    this.selectedGenre = genreId;
    this.updateVisibleMovies();
  }
}
