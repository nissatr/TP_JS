import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.html'
})
export class BooksComponent {

  books = [
    { name: 'Angular Basics', year: 2019 },
    { name: 'Advanced Angular', year: 2021 },
    { name: 'Modern Web Development', year: 2023 }
  ];

}
