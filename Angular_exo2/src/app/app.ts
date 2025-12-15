import { Component } from '@angular/core';
import { BooksComponent } from './books/books';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksComponent],
  templateUrl: './app.html'
})
export class AppComponent {}
