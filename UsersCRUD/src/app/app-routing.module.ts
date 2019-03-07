import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path:'', redirectTo:'users', pathMatch:'full'},
  { path : 'user-edit/:id', component: UserEditComponent },
  { path : 'user-add', component: UserAddComponent },
  { path : 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
