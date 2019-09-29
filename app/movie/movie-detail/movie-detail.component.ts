import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/navbar/services/navbar.service';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-800px)'}), //  + 'translateX(200px)' + 'rotate(90deg)'}),
           // style({ opacity: 0, transform: 'rotate(-90deg)' }),
            stagger(
              '250ms',
              animate(
                '1000ms ease-in',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ opacity: 0, transform: 'translateY(-800px)'}),
           // style({ opacity: 0, transform: 'rotate(-90deg)' }),
            stagger(
              '750ms',
              animate(
                '1000ms ease-in',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          // [
          //   animate('1000ms ease-out', style({ opacity: 1, transform: 'rotate(180deg)' }))
          // ],
          {
            optional: true,
          },
        )
      ])
    ])
  ]
})
export class MovieDetailComponent implements OnInit, OnDestroy {
id: number;
movie: Movie;
movieSubscription$: Subscription;

  constructor(
    private movieService: MovieService,
    private navbarService: NavbarService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.movieSubscription$ = this.movieService.movieFromHttp(this.id).subscribe(movie => {
      this.movie = movie;
      this.navbarService.title.next(this.movie.name);
      this.navbarService.movieId.next(this.movie.id);
    });
  }

  ngOnDestroy(): void {
    this.movieSubscription$.unsubscribe();
  }

}
