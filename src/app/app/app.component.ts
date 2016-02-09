import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';
import {GameComponent} from '../game/game.component';

@Component({
  selector: 'app',
  viewProviders: [],
  templateUrl: 'app/app/app.component.html',
  styleUrls: ['app/app/app.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/home', component: HomeComponent, as: 'Home' },
  { path: '/about', component: AboutComponent, as: 'About' },
  { path: '/game', component: GameComponent, as: 'Game' }
])
export default class AppComponent {}
