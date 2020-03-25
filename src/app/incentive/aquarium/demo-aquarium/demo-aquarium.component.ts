import { Component, OnInit } from '@angular/core';

import { BootL1 } from '../levels/FishBowlL1/Boot';
import { PreloaderL1 } from '../levels/FishBowlL1/Preloader';
import { FishBowlL1 } from '../levels/FishBowlL1/Game';


import { BootL2 } from '../levels/FishBowlL2/Boot';
import { PreloaderL2 } from '../levels/FishBowlL2/Preloader';
import { FishBowlL2 } from '../levels/FishBowlL2/Game';


import { BootL3 } from '../levels/SeaLevelL3/Boot';
import { PreloaderL3 } from '../levels/SeaLevelL3/Preloader';
import { SeaLevelL3 } from '../levels/SeaLevelL3/Game';


import { BootL4 } from '../levels/SeaLevelL4/Boot';
import { PreloaderL4 } from '../levels/SeaLevelL4/Preloader';
import { SeaLevelL4 } from '../levels/SeaLevelL4/Game';


import { BootGameOver } from '../levels/GameOver/Boot';
import { PreloaderGameOver } from '../levels/GameOver/Preloader';
import { GameOver } from '../levels/GameOver/GameOver';


import { BootTundraL5 } from '../levels/TundraLevelL5/Boot';
import { PreloaderTundraL5 } from '../levels/TundraLevelL5/Preloader';
import { GameTundraL5 } from '../levels/TundraLevelL5//Game';


import { BootRainforestL6 } from '../levels/RainforestL6/Boot';
import { PreloaderRainforestL6 } from '../levels/RainforestL6/Preloader';
import { GameRainforestL6 } from '../levels/RainforestL6/Game';


//import { GameOver } from '../fishgame/GameOver';
import { Game } from '../fishgame/Game';
import { Level1 } from '../fishgame/Level1';
import { Level1Small } from '../fishgame/Level1Small';
import { TundraLevel1 } from '../demo-tundra/Tundra1';
//import { FormsModule } from '@angular/forms';
//import { PickGameService } from './pick-game.service';
import { ActivatedRoute, Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
//import { PreLoad } from '../../../PreLoad';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { UserProfileService } from 'src/app/user/user-profile/user-profile.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { ModalUnlockedPageComponent } from '../modal-unlocked-page/modal-unlocked-page.component';


import { myEnterAnimation } from '../../../animations/modal_enter';
import { myLeaveAnimation } from '../../../animations/modal_leave';

declare let Phaser: any;

@Component({
  selector: 'app-demo-aquarium',
  templateUrl: './demo-aquarium.component.html',
  styleUrls: ['./demo-aquarium.component.less'],
})

//@PreLoad('survey')
export class DemoAquariumComponent implements OnInit {

  game;
  pickedGame;
  isLoaded = false;
  public isShowingRouteLoadIndicator: boolean;
  survey_text; 
  
  // totalPoints = 0;
  get totalPoints(){
    return this.userProfileService.points;
  }

  get username(){
    if(this.userProfileService == undefined)
      return "test";
    else{
      //console.log("User profile -- username -- called from here");
      return this.userProfileService.username;
    }
  }


/*   get surveyPath(){
    if (this.userProfileService.isParent){
      return "survey/samplesurvey"; //"/survey/caregiversurvey"
    } else{
      return "survey/samplesurvey2"; //"/survey/ayasurvey"
    }
  } */


  constructor(private router: Router, 
    private alertCtrl: AlertController,
    private modalController: ModalController,
    //private pickGameService: PickGameService,
    private ga: GoogleAnalytics,
    private platform: Platform,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService) { 
    console.log("Constructor called");
    
    /*    
      this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.totalPoints = this.router.getCurrentNavigation().extras.state.totalPoints;
        console.log("Pass totalPoints: "+this.totalPoints);
      }
    }); 
    */

    this.survey_text = "Start Survey";
    //this.username = "test";


    //show modal on awards
    this.showModal();
  }


  showMemeDemo(){
    this.router.navigate(['incentive/award-memes']);
  }

  showAltruisticDemo(){
    this.router.navigate(['incentive/award-altruism']);
  }


  showModal(){
    if(window.localStorage['IsModalShown'] == undefined)
      return;

    if(window.localStorage['IsModalShown'] == "false"){

      //
      var todaysDate = moment().format('YYYYMMDD');
      var storedDate = window.localStorage['LastSurveyCompletionDate'];

      //
      if(todaysDate == storedDate){
        this.computeUnlockedReinforcements();
      } 

      //
      window.localStorage.setItem("IsModalShown", "true");
    }
  }

  showModalDemo(){
    var reinforcements =  [];
    reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    //reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    //reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    //reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    //reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    //reinforcements.push({'img': "assets/img/" + "nemo" + '_tn.jpg', 'header': 'Nemo', 'text': "Do you know the animators of \"Finding nemo\" studied dogs’ facial expressions and eyes to animate the fishes’ expressions?"});
    this.presentModal(reinforcements);
  }


  //show unlocked pages, using a modal
  async presentModal(reinforcements) {
    const modal = await this.modalController.create({
      component: ModalUnlockedPageComponent,
      componentProps: {
        'reinforcements': reinforcements
      },
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      //,
      cssClass: 'my-default-2'
    });
    return await modal.present();
  }


  isFirstDayInTheStudy(){

    var daily_survey = this.userProfileService.userProfile.survey_data.daily_survey;
    var first_date = moment().format('YYYYMMDD');
    var first_date_moment_js = moment(first_date,"YYYYMMDD");
    var key_moment_js;
    for (var key in daily_survey) {
        key_moment_js = moment(key,"YYYYMMDD");
        //takes the first day only. But it may not be the first date.
        if (key_moment_js < first_date_moment_js) {
            first_date = key;
            first_date_moment_js = moment(first_date,"YYYYMMDD");
        }
    }

    var todays_date = moment().format('YYYYMMDD');
    if(todays_date == first_date)
      return true;
    else
      return false;
  }

  computeUnlockedReinforcements(){

    var currentPoints = parseInt(window.localStorage['CurrentPoints']);
    var previousPoints = parseInt(window.localStorage['PreviousPoints']);
    var awardedDollar = parseInt(window.localStorage['AwardedDollar']);
    var reinforcements = [];

    //get if money is awarded.
    if(awardedDollar > 0){
      if(this.isFirstDayInTheStudy())
        reinforcements.push({'img': 'assets/img/1dollar.jpg', 'header': 'You earned ' + awardedDollar + ' dollar(s)', 'text': 'Thanks for being a participant in the study. You earned 2 dollar.'});
      else
        reinforcements.push({'img': 'assets/img/1dollar.jpg', 'header': 'You earned ' + awardedDollar + ' dollar(s)', 'text': 'You earned 1 dollar for completing surveys 3-days in a row'});
    }
      
    //get if fish is alotted
    var previous_point = currentPoints - 60;

    fetch('../../../assets/game/fishpoints.json').then(async res => {
      //console.log("Fishes: " + data);

      var fish_data = await res.json();
      var img; 
      var header;
      var text;
      for(var i = 0; i < fish_data.length; i++) {
          if ((fish_data[i].points > previous_point) && (fish_data[i].points <= currentPoints)) {
            img = "assets/" + fish_data[i].img.substring(0, fish_data[i].img.length-4) + '_tn.jpg';
            header =  "You unlocked " + fish_data[i].name;
            text = fish_data[i].trivia;
            reinforcements.push({'img': img, 'header': header, 'text': text});
          }
      }
      console.log(JSON.stringify(reinforcements));
      if(reinforcements.length > 0)//means some rainforcement was provided.
        this.presentModal(reinforcements);
    });
  }





  goToRewardsPage(){
    console.log("rewards page");
    //this.router.navigate(['/home']);
    this.router.navigate(['incentive/treasurechest']);
  }

  

  //preload the images
  preload(){
    console.log("Preload called");
    this.game.load.image('einstein','assets/pics/ra_einstein.png');
  }

  //gets executed after preload
  create(){
    console.log(window.localStorage['TotalPoints']);
    //this.totalPoints = parseInt(window.localStorage['TotalPoints'] || "0");

    /*
    if(window.localStorage['TotalPoints'] == undefined)
        this.totalPoints = 0;
    else
        this.totalPoints = parseInt(window.localStorage['TotalPoints']);
    */

    console.log("Inside Aquarium totalPoints: "+this.totalPoints);

    console.log("create called");
    var s = this.game.add.sprite(80,9,'einstein');
    s.rotation = 0.14;
  }

  

  ngOnInit() {
    this.ga.trackView('Aquarium')
    .then(() => {console.log("trackView at Aquarium!")})
    .catch(e => console.log(e));
    //this.loadFunction();
    
  }

  ionViewDidEnter(){
    //if(this.isLoaded == true)
    //    this.loadFunction();
    this.survey_text = "Start survey";
  }

  loadFunction(){

    console.log(window.localStorage['TotalPoints']);
    //this.totalPoints = parseInt(window.localStorage['TotalPoints'] || "0");
    /*
     if(window.localStorage['TotalPoints'] == undefined)
        this.totalPoints = 0;
    else
        this.totalPoints = parseInt(window.localStorage['TotalPoints']);
    */
    //console.log("Inside Aquarium totalPoints: "+this.totalPoints);
    //this.game.destroy();

    //height adjustment for different phone types
    var GameApp = GameApp || {};
    GameApp.CANVAS_WIDTH = 382.0;
    console.log("w: " + window.innerWidth + ", h: " + window.innerHeight + ", dp: " + window.devicePixelRatio);
    if(window.innerWidth > GameApp.CANVAS_WIDTH)
        GameApp.CANVAS_WIDTH = window.innerWidth;
    GameApp.CANVAS_HEIGHT = window.innerHeight;

    //var game;
    if(this.platform.is('ios')){
        if(GameApp.CANVAS_HEIGHT < 642.0){//iphone SE fix.
            GameApp.CANVAS_HEIGHT += 30;
            GameApp.CANVAS_WIDTH = window.innerWidth;
        }
        this.game = new Phaser.Game(GameApp.CANVAS_WIDTH, GameApp.CANVAS_HEIGHT - 36*window.devicePixelRatio, Phaser.AUTO, 'gameDiv');
    }else if(this.platform.is('android'))
        this.game = new Phaser.Game(GameApp.CANVAS_WIDTH, GameApp.CANVAS_HEIGHT - 74, Phaser.AUTO, 'gameDiv');    
    else
        this.game = new Phaser.Game(GameApp.CANVAS_WIDTH, GameApp.CANVAS_HEIGHT - 100, Phaser.AUTO, 'gameDiv');

    //this.totalPoints = 2125;


    if(this.totalPoints < 0){
      this.game.state.add('Boot', BootGameOver);
      this.pickedGame = 'GameOver';
      var preLoader = new PreloaderGameOver();
      this.game.state.add('Preloader', preLoader);
      var gameover = new GameOver();
      this.game.state.add('GameOver', gameover);

    } else if(this.totalPoints <770 && this.totalPoints >= 0){

      this.game.state.add('Boot', BootL1);
      this.pickedGame = 'FishBowlL1';
      var preLoader = new PreloaderL1();
      this.game.state.add('Preloader', preLoader);
      var fishBowlL1 = new FishBowlL1();
      fishBowlL1.setTotalPoints(this.totalPoints);
      this.game.state.add('FishBowlL1', fishBowlL1);


    } else if ( this.totalPoints >=770 && this.totalPoints <1060 ){

      this.game.state.add('Boot', BootL2);
      this.pickedGame = 'FishBowlL2';
      var preLoader = new PreloaderL2();
      this.game.state.add('Preloader', preLoader);
      var fishBowlL2 = new FishBowlL2();
      fishBowlL2.setTotalPoints(this.totalPoints);
      this.game.state.add('FishBowlL2', fishBowlL2);


    } else if( this.totalPoints >=1060 && this.totalPoints <1710 ){

      this.game.state.add('Boot', BootL3);
      this.pickedGame = 'SeaLevelL3';
      var preLoader = new PreloaderL3();
      this.game.state.add('Preloader', preLoader);
      var seaLevelL3 = new SeaLevelL3();
      seaLevelL3.setTotalPoints(this.totalPoints);
      this.game.state.add('SeaLevelL3', seaLevelL3);

    } else if( this.totalPoints >=1710 && this.totalPoints <2120){

      this.game.state.add('Boot', BootL4);
      this.pickedGame = 'SeaLevelL4';
      var preLoader = new PreloaderL4();
      this.game.state.add('Preloader', preLoader);
      var seaLevelL4 = new SeaLevelL4();
      seaLevelL4.setTotalPoints(this.totalPoints);
      this.game.state.add('SeaLevelL4', seaLevelL4);

    } else if( this.totalPoints >=2120 && this.totalPoints <3020){

      this.game.state.add('Boot', BootTundraL5);
      this.pickedGame = "TundraLevel1";
      var preLoader = new PreloaderTundraL5();
      this.game.state.add('Preloader', preLoader);
      var level5 = new GameTundraL5();
      level5.setTotalPoints(this.totalPoints);
      this.game.state.add('TundraLevel1', level5);

    }else if( this.totalPoints >=3020){

        this.game.state.add('Boot', BootRainforestL6);
        this.pickedGame = "RainforestLevel6";
        var preLoader = new PreloaderRainforestL6();
        this.game.state.add('Preloader', preLoader);
        var level6 = new GameRainforestL6();
        level6.setTotalPoints(this.totalPoints);
        this.game.state.add('RainforestLevel6', level6);

    } else {
      
      //---
      var preLoader = new PreloaderL1();
      preLoader.setGameName(this.pickedGame = "GameOver");
      this.game.state.add('Preloader', preLoader);


    }
    //this.game.state.add('GameOver', GameOver);
    this.game.state.start('Boot');
    //self = this;

    this.game.state.states[this.pickedGame].assignscope(this);

    //this.pickGameService.currentGame.subscribe(game => this.pickedGame = game)
  }
 
  ionViewDidLeaveFunction(){
    console.log("Aquarium, ionDidLeave");
    this.survey_text = "Start survey";
    this.game.destroy();
  }

  pauseGameRendering(){
    this.game.state.states[this.pickedGame].yourGamePausedFunc();
  }

  resumeGameRendering(){
    this.game.state.states[this.pickedGame].yourGameResumedFunc();
  }

  ngAfterViewInit(){
    this.ga.trackView('Aquarium')
    .then(() => {console.log("trackView at Aquarium!")})
    .catch(e => console.log(e));
        
  }  

  ionViewDidLeave(){
    this.game.destroy();
  }

 

}
