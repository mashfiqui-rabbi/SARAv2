import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SimpleLoadingStrategy } from './SimpleLoadingStrategy';
//import { SelectiveLoadingStrategy } from './SelectiveLoadingStrategy';
//import { InitiatedDrinkComponent } from './survey/initiated-drink/initiated-drink.component';
//import { AwardComponent } from './incentive/award/award.component';
import { AwardMemesComponent } from './incentive/award-memes/award-memes.component';
//import { ActivetaskComponent } from './survey/activetask/activetask.component';
//import { ActiveTask2Component } from './survey/active-task2/active-task2.component';
//import { VisualizationComponent } from './incentive/visualization/visualization.component';
//import { DynamicSurveyComponent } from './survey/dynamic-survey/dynamic-survey.component';
import { DemoAquariumComponent } from './incentive/aquarium/demo-aquarium/demo-aquarium.component';
//import { Q1MotivatedComponent } from './incentive/life-insights/q1-motivated/q1-motivated.component';
//import { SampleSurveyComponent } from './survey/sample-survey/sample-survey.component';
//import { SampleLifeInsightsComponent } from './incentive/life-insights/sample-life-insights/sample-life-insights.component';

const routes: Routes = [
/*   { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'survey/initated-drink', component: InitiatedDrinkComponent },
  { path: 'survey/activetask', component: ActivetaskComponent },
  { path: 'survey/activetask2', component: ActiveTask2Component },
  { path: 'survey/dynamicsurvey', component: DynamicSurveyComponent }, 
  { path: 'survey/samplesurvey', component: SampleSurveyComponent }, 
  { path: 'incentive/award', component: AwardComponent },
  { path: 'incentive/award-memes', component: AwardMemesComponent },
  { path: 'incentive/visualization', component: VisualizationComponent},
  { path: 'incentive/aquariumone', component: DemoAquariumComponent },  
  { path: 'life-insight/q1lifeinsight', component: Q1MotivatedComponent },
  { path: 'incentive/sample-life-insight', component: SampleLifeInsightsComponent } 
 */
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  //{ path: 'incentive/award-memes', component: AwardMemesComponent },
  //{ path: 'incentive/aquariumone', component: DemoAquariumComponent },  

  { path: 'survey', 
    //loadChildren: () => import('./survey/survey.module').then(mod => mod.SurveyModule)
    loadChildren: './survey/survey.module#SurveyModule',
    data: {
      //name: 'survey'
      preload: true
    }
  }, 

  { path: 'incentive/aquarium', 
       loadChildren: './incentive/aquarium/aquarium.module#AquariumModule',
       data: {
        //name: 'survey'
        preload: true
      }    
  }, 

  { path: 'incentive', 
      loadChildren: './incentive/incentive.module#IncentiveModule',
     data: {
       //name: 'survey'
       preload: true
     }    
  }
      
  // { path: 'incentive/life-insights', 
  //   loadChildren: './incentive/life-insights/life-insights.module#LifeInsightsModule',
  //   data: {
  //     //name: 'life-insights'
  //     preload: true
  //   } 
  // }, 

];

@NgModule({
  providers: [
    SimpleLoadingStrategy
    //SelectiveLoadingStrategy
  ],
  imports: [
    //RouterModule.forRoot(routes)
    RouterModule.forRoot(routes, { preloadingStrategy: SimpleLoadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
