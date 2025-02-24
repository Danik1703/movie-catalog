import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieTrailer: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe((data) => {
        this.movie = data;
      });
      this.movieService.getMovieTrailer(+movieId).subscribe((videoData) => {
        this.movieTrailer = videoData.results[0]?.key;  // Получаем ключ трейлера
      });
    }
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full'); 
    }
    for (let i = 0; i < halfStars; i++) {
      stars.push('half'); 
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty'); 
    }
    return stars;
  }

  openTrailer(trailerUrl: string): void {
    window.open(`https://www.youtube.com/watch?v=${trailerUrl}`, '_blank');
  }
}
