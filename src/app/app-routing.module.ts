import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { RegisterComponent } from './register/register.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UserComponent } from './user/user.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PanierComponent } from './panier/panier.component';


const routes: Routes = [
{path:"",redirectTo:"home",pathMatch:"full"},
{path:"login",component:LoginComponent},
{path:"home",component:HomeComponent},
{path:"client",component:ClientComponent},
{path:"register",component:RegisterComponent},
{path:"home-admin",component:HomeAdminComponent},
{path:"user",component:UserComponent},
{path:"panier",component:PanierComponent},
{path:'categorie/:id',component: CategorieComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
