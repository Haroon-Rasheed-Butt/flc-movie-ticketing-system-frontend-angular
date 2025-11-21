import { Component, Input } from '@angular/core';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent {
  @Input() ratings: Rating[] = [];
}
