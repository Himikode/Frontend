import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cup-rating',
  templateUrl: './cup-rating.component.html',
  styleUrls: ['./cup-rating.component.scss'],
})
export class CupRatingComponent implements OnInit {

  @Input() rating: number = 0;

  status = {
    cup1: 'empty',
    cup2: 'empty',
    cup3: 'empty',
    cup4: 'empty',
    cup5: 'empty',
  }


  constructor() { }

  ngOnInit() {

    this.set(this.rating);



  }

  ngOnChanges(changes: SimpleChanges) {
    this.set(this.rating);
  }


  set(rating) {
    this.status = {
      cup1: 'empty',
      cup2: 'empty',
      cup3: 'empty',
      cup4: 'empty',
      cup5: 'empty',
    }
    if (this.rating < 0.5) {
    }
    if (this.rating >= 0.5 && this.rating < 1) {
      this.status.cup1 = 'half';
    }

    if (this.rating >= 1) {
      this.status.cup1 = 'full';
    }
    if (this.rating >= 1.5 && this.rating < 2) {
      this.status.cup2 = 'half';
    }

    if (this.rating >= 2) {
      this.status.cup2 = 'full';
    }
    if (this.rating >= 2.5 && this.rating < 3) {
      this.status.cup3 = 'half';
    }

    if (this.rating >= 3) {
      this.status.cup3 = 'full';
    }
    if (this.rating >= 3.5 && this.rating < 4) {
      this.status.cup4 = 'half';
    }

    if (this.rating >= 4) {
      this.status.cup4 = 'full';
    }
    if (this.rating >= 4.5 && this.rating < 5) {
      this.status.cup5 = 'half';
    }

    if (this.rating >= 5) {
      this.status.cup5 = 'full';
    }
  }



}
