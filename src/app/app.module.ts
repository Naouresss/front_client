import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from './services/authentification.service';
import { ClientComponent } from './client/client.component';
import { RegisterComponent } from './register/register.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UserComponent } from './user/user.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategorieComponent } from './categorie/categorie.component';
import { PanierComponent } from './panier/panier.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClientComponent,
    RegisterComponent,
    HomeAdminComponent,
    UserComponent,
    CategorieComponent,
    PanierComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [UserService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
