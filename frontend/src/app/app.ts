import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardListComponent } from './components/card/card';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardListComponent, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hackerstore');
}
