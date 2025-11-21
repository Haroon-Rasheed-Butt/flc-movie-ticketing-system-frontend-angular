import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MovieService } from '../../services/movie.service';
import { RatingService, RatingPayload } from '../../services/rating.service';
import { Movie } from '../../models/movie.model';
import { Rating } from '../../models/rating.model';
import { SAMPLE_ACCOUNTS } from '../../shared/constants';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})
export class MovieDetailPageComponent implements OnInit {
  movie: Movie | null = null;
  ratings: Rating[] = [];
  sampleAccounts = SAMPLE_ACCOUNTS;
  ratingForm: FormGroup;
  cartForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private readonly ratingService: RatingService,
    private readonly cartService: CartService,
    private readonly fb: FormBuilder,
    private readonly messages: MessageService
  ) {
    this.ratingForm = this.fb.group({
      accountId: [SAMPLE_ACCOUNTS[0].id, Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
    this.cartForm = this.fb.group({
      accountId: [SAMPLE_ACCOUNTS[0].id, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadMovie(id);
      this.loadRatings(id);
    }
  }

  loadMovie(id: number): void {
    this.movieService.getMovie(id).subscribe((movie) => (this.movie = movie));
  }

  loadRatings(id: number): void {
    this.ratingService.getRatings(id).subscribe((entries) => (this.ratings = entries));
  }

  submitRating(): void {
    if (!this.movie || this.ratingForm.invalid) {
      return;
    }
    const payload: RatingPayload = this.ratingForm.value;
    this.ratingService
      .addRating(this.movie.id, payload)
      .subscribe((rating) => {
        this.ratings = [rating, ...this.ratings];
        this.messages.show('Rating added', 'success');
        this.ratingForm.reset({
          accountId: SAMPLE_ACCOUNTS[0].id,
          rating: 5,
          comment: ''
        });
      });
  }

  addToCart(): void {
    if (!this.movie || this.cartForm.invalid) {
      return;
    }
    const payload = {
      accountId: this.cartForm.value.accountId as number,
      movieId: this.movie.id,
      quantity: this.cartForm.value.quantity as number
    };
    this.cartService.addToCart(payload).subscribe(() => {
      this.messages.show('Added to cart', 'success');
      this.cartForm.patchValue({ quantity: 1 });
    });
  }

  get averageRating(): number {
    if (!this.ratings.length) {
      return 0;
    }
    return this.ratings.reduce((sum, rating) => sum + rating.rating, 0) / this.ratings.length;
  }
}
