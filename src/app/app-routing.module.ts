import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeListComponent } from './home-list/home-list.component';
import { NewListComponent } from './new-list/new-list.component';

const routes: Routes = [
  { path: 'home-list', component: HomeListComponent },
  { path: 'new-list', component: NewListComponent },
  { path: '', redirectTo: '/home-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
