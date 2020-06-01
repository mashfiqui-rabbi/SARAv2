import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignalService } from './notification/one-signal.service';

import { environment } from '../environments/environment';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart, NavigationEnd } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { UserProfileService } from './user/user-profile/user-profile.service';
import { AuthService } from './user/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public isShowingRouteLoadIndicator: boolean;
  loading;
  isLoading = true;

  get username(){
    if(this.userProfileService == undefined)
      return "test";
    else{
      //console.log("User profile -- username -- called from here");
      return this.userProfileService.username;
    }
  }

  constructor(
    private router: Router, 
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignalService: OneSignalService,
    private authService: AuthService,
    private userProfileService: UserProfileService,
    public loadingController: LoadingController,
    public navController: NavController
   ) {
    this.initializeApp();

    router.events.subscribe(
			( event: RouterEvent ) : void => {

        //this.isShowingRouteLoadIndicator = false;
        var asyncLoadCount = 0;

        
				if ( event instanceof RouteConfigLoadStart ) {
          asyncLoadCount++;
          console.log("Routing started");
          //console.log(event);
          //this.survey_text = "Loading Survey";
          console.log(event.route.path);

          // if(event.route.path == "survey")
          //    this.showLaoding();

				} else if ( event instanceof RouteConfigLoadEnd ) {
          asyncLoadCount--;
          console.log("Routing ended");
          console.log(event.route.path);

          // if(event.route.path == "survey")
          //    this.dismissLoading();

          //console.log(event);
          //this.survey_text = "Start survey";
          //console.log(this.router.url);
				} else if ( event instanceof NavigationStart ) {
          console.log("Navigation started");
          //this.survey_text = "Start survey";
				} else if ( event instanceof NavigationEnd ) {
          asyncLoadCount--;
          console.log("Navigation ended");
          //this.survey_text = "Start survey";
				}

				// If there is at least one pending asynchronous config load request,
				// then let's show the loading indicator.
				// --
				// CAUTION: I'm using CSS to include a small delay such that this loading
				// indicator won't be seen by people with sufficiently fast connections.
				this.isShowingRouteLoadIndicator = !! asyncLoadCount;

			}
		);
  }

  agreeToTerms: boolean = JSON.parse(localStorage.getItem("agreeToTerms"));
  private userSub: Subscription;

  ngOnInit(){
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

  initializeApp() {

    this.authService.autoLogin();
    if(this.authService.isLoggedIn()){
      this.showLoading();
      this.userSub = this.userProfileService.initializeObs().subscribe(() =>{        
        this.dismissLoading();
        this.isLoading = false;
        console.log("successfully logged in");
      });
      // this.userProfileService.initialize();
      // if we can for things to wait to progress in here
      // then, we'll only need to load user profile here and at login in Auth component
    }
    else{
      console.log("log in unsuccessful.");
      this.dismissLoading();
      this.isLoading = false;
    }

    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();

      // let status bar overlay webview
      //this.statusBar.overlaysWebView(true);
      // set status bar to white
      //this.statusBar.backgroundColorByHexString('#ffffff');

      if(this.platform.is('android')) {
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString("#004166");
      }

      this.splashScreen.hide();
      this.oneSignalService.initOneSignal();

    });
    //window.localStorage.setItem("TotalPoints", "0");

    // let status bar overlay webview
    //this.statusBar.overlaysWebView(true);

    // set status bar to white
    //this.statusBar.backgroundColorByHexString('#ffffff');


  }

  async showLoading(){
    this.loading = await this.loadingController.create({
      message: "Loading...",
      spinner: "lines",
      duration: 5000
    });

    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading after 5 seconds');
    });

    this.loading.present();
  }

  async dismissLoading(){
    this.loading.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  //
  async showPreviewOfFishBowl(){
    this.navController.navigateRoot(['/preview/fishbowl']);
  }

  async showPreviewOfSea(){
    this.navController.navigateRoot(['/preview/sea']);
  }

  async showPreviewOfTundra(){
    this.navController.navigateRoot(['/preview/tundra']);
  }

  async showPreviewOfRainforest(){
    this.navController.navigateRoot(['/preview/rainforest']);
  }

}
