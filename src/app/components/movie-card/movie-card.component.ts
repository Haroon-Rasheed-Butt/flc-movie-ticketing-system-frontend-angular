import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: Movie | null = null;
  @Input() selectedAccountId = 1;
  @Output() addToCart = new EventEmitter<{ movieId: number; accountId: number }>();

  placeholder = 'https://source.unsplash.com/random/600x400?movie';

  emitAdd(): void {
    if (!this.movie) {
      return;
    }
    this.addToCart.emit({ movieId: this.movie.id, accountId: this.selectedAccountId });
  }
}
