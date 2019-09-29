import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from './services/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie/services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title$ = this.navbarService.title;
  id$ = this.navbarService.movieId;
  movieIDSubscription$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
  }

  deleteMovie() {
    let id = 0;
    this.movieIDSubscription$ = this.navbarService.movieId.subscribe(data => {
      id = data;
      if (window.confirm('Är du säker ?')) {
        this.movieIDSubscription$ =  this.movieService.deleteMovie(id).subscribe(resp => {
          this.router.navigateByUrl('/');
        });
      }
    });
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.movieIDSubscription$.unsubscribe();
  }
}
