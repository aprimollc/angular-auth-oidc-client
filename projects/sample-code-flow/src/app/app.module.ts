import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth-config.module';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, UnauthorizedComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'forbidden', component: UnauthorizedComponent },
            { path: 'unauthorized', component: UnauthorizedComponent },
        ]),
        AuthConfigModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private readonly eventService: PublicEventsService) {
        this.eventService
            .registerForEvents()
            .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
            .subscribe((config) => console.log('ConfigLoaded', config));

        this.eventService
            .registerForEvents()
            .pipe(filter((notification) => notification.type === EventTypes.ConfigLoadingFailed))
            .subscribe(({ value }) => console.log('ConfigLoadingFailed', value));
    }
}
