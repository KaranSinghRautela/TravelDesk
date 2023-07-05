import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AddUserComponent } from 'src/app/user/add-user/add-user.component';
import { ListUserComponent } from 'src/app/user/list-user/list-user.component';

const routes : Routes = [
  // {path:'', pathMatch:'full' ,redirectTo:'adduser'},
  {path:'adduser',component:AddUserComponent},
  {path: 'list',component : ListUserComponent}
]


@NgModule({
  declarations: [],

  imports: [

    CommonModule,RouterModule.forRoot(routes)

  ],

  exports : [RouterModule]
})
export class RoutingModule { }

export const Components =

[
 ListUserComponent,
 AddUserComponent
] 
