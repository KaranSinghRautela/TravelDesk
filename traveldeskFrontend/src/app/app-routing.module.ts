import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AddUserComponent } from 'src/app/user/add-user/add-user.component';
import { ListUserComponent } from 'src/app/user/list-user/list-user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { User } from './models/User';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';
import { ErrorComponent } from './error/error.component';
import { ListRequestComponent } from './request/list-request/list-request.component';
import { AddRequestComponent } from './request/add-request/add-request.component';
import { RequestDetailsComponent } from './request/request-details/request-details.component';

const routes : Routes = [
  {path:'', pathMatch:'full' ,redirectTo:'login'},
  {path:'addUser',component:AddUserComponent,canActivate:[authGuard],data:{roles:['Admin']}},
  {path: 'userList',component : ListUserComponent,canActivate:[authGuard],data:{roles:['Admin']}},
  {path:'userDetails/:id',component:UserDetailsComponent,canActivate:[authGuard],data:{roles:['Admin']}},
  {path: 'updateUser/:id', component: AddUserComponent,canActivate:[authGuard],data:{roles:['Admin']} },
  {path : 'login',component:LoginComponent,canActivate:[loginGuard] ,data: { roles: ['guest'] }},
  {path : 'requests',component:ListRequestComponent,canActivate:[authGuard] ,data: { roles: ['Employee','Manager','HR Admin'] }},
  {path : 'addRequest',component:AddRequestComponent,canActivate:[authGuard] ,data: { roles: ['Employee'] }},
  {path:'requestDetails/:id',component:RequestDetailsComponent,canActivate:[authGuard],data:{roles:['Employee','Manager','HR Admin']}},
  {path : '**',component:ErrorComponent}
 
]


@NgModule({
  declarations: [],

  imports: [

    CommonModule,RouterModule.forRoot(routes)

  ],
  providers:[{ provide: 'CanActivateFn', useValue: authGuard },{ provide: 'CanActivateLogin', useValue: loginGuard }],
  exports : [RouterModule]
})
export class AppRoutingModule { }

export const Components =

[
 ListUserComponent,
 AddUserComponent,
 UserDetailsComponent,
 LoginComponent
] 
