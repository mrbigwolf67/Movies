import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private ROOT_URL = 'http://localhost:3000/movies';
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  getMoviesFromHttp() {
    return this.http.get<Movie[]>(this.ROOT_URL).pipe(this.addDelayForLoading);
  }

  movieFromHttp(id: number) {
    return this.http.get<Movie>(`${this.ROOT_URL}/${id}`);
  }

  addMovieToHttp(movie: Movie) {
    return this.http.post(this.ROOT_URL, movie);
  }

  deleteMovie(id: number) {
    return this.http
      .delete<Movie>(`${this.ROOT_URL}/${id}`, this.httpOptions)
      .pipe(retry(1));
  }

  addDelayForLoading(obs: Observable<any>) {
    return obs.pipe(delay(50));
  }

  // getMovies() {
  //   return of(movies);
  // }

  // movie(id: number) {
  //   return of(
  //     movies.find(movie => +movie.id === +id)
  //   );
  // }
}
