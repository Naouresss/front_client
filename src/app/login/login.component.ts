import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Authentificationrequest } from '../models/authentificationrequest';
import { LoginUser, User } from '../models/User';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  form: LoginUser = {} as LoginUser;
  buttonText: string = "Login";
  alertIsDisplayed: boolean = false;
  alertText: string = "The email or password is incorrect !";
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.buttonText = "Login";
  }
  emailIsNotValid(name: any): any {
    return (
      name.invalid == true
      && (name.dirty == true ||
        name.touched == true));
  }
  passwordIsNotValid(name: any): any {
    return (
      name.invalid == true
      && (name.dirty == true ||
        name.touched == true));
  }
  isNotValide(email: any, password: any) {
    return email.invalid == true || password.invalid == true;
  }
  addUser() {
    

    this.buttonText = "Loading...";
    this.accountService.login(this.form).subscribe(
      (data) => {
        
        this.accountService.registerToken(data);
        alert("Login is a success !");
        console.log(this.accountService.getCurrentUser());
        
        window.location.href = "/client";
      },
      (e) => {
        console.log(e);
        this.alertIsDisplayed = true;
      }
    );
    this.buttonText = "Login";
  }
  closeAlert() {
    this.alertIsDisplayed = false;
  }

  
  /*loginForm!: FormGroup;
  error: string = '';
  currentUser: User | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private router : Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  login(): void {
    const authenticationRequest: Authentificationrequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  
    this.authService.authenticate(authenticationRequest).subscribe(
      (response) => {
        this.authService.storeAuthToken(response.token);
        // rediriger vers la page suivante ici
        //this.router.navigate(['/home']);
        // Fetch the current user
        const authToken = this.authService.getAuthToken();
        if (authToken) {
          this.authService.getCurrentUser(authToken).subscribe(
            (user) => {
            if (user.role === 'ROLE_ADMIN') {
                this.router.navigate(['/home-admin']);
              } else {
                this.router.navigate(['/client']);
              }
            
            }
           
          );
        }
      },
      (error) => {
        this.error = 'Invalid email or password.';
       
      }
    );
  }*/


}
