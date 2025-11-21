import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../../models/movie.model';
import { MovieService, MoviePayload } from '../../services/movie.service';
import { MOVIE_TYPES } from '../../shared/constants';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-admin-movie-page',
  templateUrl: './admin-movie-page.component.html',
  styleUrls: ['./admin-movie-page.component.scss']
})
export class AdminMoviePageComponent implements OnInit {
  movies: Movie[] = [];
  isEditing = false;
  editingId: number | null = null;
  movieTypes = MOVIE_TYPES;

  movieForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly movieService: MovieService,
    private readonly messages: MessageService
  ) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      publicationYear: [null],
      director: [''],
      actor: [''],
      genre: [''],
      coverPhoto: [''],
      typeId: [this.movieTypes[0].id, Validators.required],
      ticketPrice: [0, Validators.required],
      accountId: [null]
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies(0, 10).subscribe((page) => (this.movies = page.content));
  }

  edit(movie: Movie): void {
    this.isEditing = true;
    this.editingId = movie.id;
    this.movieForm.patchValue({
      name: movie.name,
      description: movie.description,
      publicationYear: movie.publicationYear ?? null,
      director: movie.director,
      actor: movie.actor,
      genre: movie.genre,
      coverPhoto: movie.coverPhoto,
      typeId: movie.typeId,
      ticketPrice: movie.ticketPrice,
      accountId: movie.ownerId ?? null
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.movieForm.reset({
      typeId: this.movieTypes[0].id,
      ticketPrice: 0
    });
  }

  submit(): void {
    if (this.movieForm.invalid) {
      return;
    }
    const payload: MoviePayload = this.movieForm.value as MoviePayload;
    if (this.isEditing && this.editingId) {
      this.movieService.updateMovie(this.editingId, payload).subscribe(() => {
        this.messages.show('Movie updated', 'success');
        this.loadMovies();
        this.cancelEdit();
      });
    } else {
      this.movieService.createMovie(payload).subscribe(() => {
        this.messages.show('Movie created', 'success');
        this.loadMovies();
        this.movieForm.reset({
          typeId: this.movieTypes[0].id,
          ticketPrice: 0
        });
      });
    }
  }

  delete(movie: Movie): void {
    const confirmed = window.confirm(`Remove ${movie.name}? This cannot be undone.`);
    if (!confirmed) {
      return;
    }
    this.movieService.deleteMovie(movie.id).subscribe(() => {
      this.messages.show('Movie deleted', 'success');
      this.loadMovies();
    });
  }
}
