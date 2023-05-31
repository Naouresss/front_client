import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { AuthentificationService } from '../services/authentification.service';
import { Registerrequest } from '../models/registerrequest';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  user!: User;
  selectedUser!: User;
  users!: User[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthentificationService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
 
  }




  onSubmit(): void {
    const registerRequest: Registerrequest = {
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
  
    this.authService.register(registerRequest).subscribe(
      (response) => {
        //this.authService.storeAuthToken(response.token);
       
        
              //this.loadUtilisateurs();
              alert('Account added successfully!! :-)\n\n');
              this.gotoList();
            
            
           
          
        }
             
    )
      
      
    
  }

  initUtilisateur(){
    this.selectedUser = new User();
   
  }  loadUtilisateurs(){
    this.userService.getAllUtilisateurs().subscribe(
      data => {this.users=data},
      error =>{console.log('An error was occured.')},
    () => {console.log('loading produits was done.')}
      );
  }


  gotoList() {
    this.router.navigate(['login']);
  }
}
