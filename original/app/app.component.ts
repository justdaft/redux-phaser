import {Component} from 'angular2/core';
// import {Fazer} from './fazer';
import {MatchingGame} from './matching/matching.game.component';



@Component({
  selector: 'my-app',
  template: `
    <matching-game></matching-game>   
  `,
  directives: [MatchingGame],
  styles: [`
    a {padding: 5px;text-decoration: none;}
    a:visited, a:link {color: #444;}
    a:hover {color: white; background-color: #1171a3;}
    a.router-link-active {color: white; background-color: #52b9e9;}
  `]
})
export class AppComponent {
  public title = 'set2stun';
}
