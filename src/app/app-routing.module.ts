import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserInfoGuard } from './user-info/user-info.guard';
import { UserEditGuard } from './user-edit/user-edit.guard';

const routes:Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full' },
	{ path:'user-info', component: UserInfoComponent, canActivate: [UserInfoGuard]},
  { path:'user-edit', component: UserEditComponent, canActivate: [UserEditGuard]},
  { path: '**', component:ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
