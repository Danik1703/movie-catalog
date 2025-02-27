import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieTrailer: string | undefined;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe((data) => {
        this.movie = data;
        this.checkFavoriteStatus();
      });
  
      this.movieService.getMovieTrailer(+movieId).subscribe((videoData: { results: { type: string; key: string }[] }) => {
        if (videoData.results.length > 0) {
          this.movieTrailer = videoData.results.find((video: { type: string; key: string }) => video.type === 'Trailer')?.key;
        }
      });
    }
  }
  

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    for (let i = 0; i < fullStars; i++) stars.push('full');
    for (let i = 0; i < halfStars; i++) stars.push('half');
    for (let i = 0; i < emptyStars; i++) stars.push('empty');

    return stars;
  }

  openTrailer(): void {
    if (this.movieTrailer) {
      window.open(`https://www.youtube.com/watch?v=${this.movieTrailer}`, '_blank');
    }
  }

  toggleFavorite(): void {
    let favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.isFavorite) {
      favorites = favorites.filter(fav => fav.id !== this.movie.id);
    } else {
      favorites.push({ id: this.movie.id, title: this.movie.title, poster_path: this.movie.poster_path });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.checkFavoriteStatus(); 
  }
  

  checkFavoriteStatus(): void {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.some(fav => fav.id === this.movie.id);
  }

  goBack(): void {
    this.location.back();
  }
}
