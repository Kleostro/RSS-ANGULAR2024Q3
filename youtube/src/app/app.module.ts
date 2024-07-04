import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouterOutlet } from '@angular/router';

import AppComponent from './app.component';
import routes from './app.routes';
import HeaderComponent from './core/header/components/header/header.component';

@NgModule({
  imports: [BrowserModule, HeaderComponent, RouterOutlet],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync(), provideRouter(routes)],
})
export default class AppModule {}
