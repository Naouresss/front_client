import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  currentUser: User | null = null;
  users: User[] | null = null;
  selectedUser: User | undefined;
  private apiUrl = 'http://localhost:8090/api/user/clients';
  http: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private userService: UserService,
    private router : Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      this.authService.getCurrentUser(authToken).subscribe(userr => {
        this.currentUser = userr;
      });
      this.loadUtilisateurs();
      this.users = this.route.snapshot.data['users'];
    }
   
 
}

loadUtilisateurs(){
  this.userService.getAllClients().subscribe(
    data => {this.users=data},
    error =>{console.log('An error was occured.')},
  () => {console.log('loading produits was done.')}
    );
     
}
updateUtilisateur(id: any){
  this.router.navigate(['updateU', id]);
 
}
deleteUtilisateur(id:any){
  this.userService.deleteUser(id).subscribe(
    res =>{
      this.selectedUser= new User();
      this.loadUtilisateurs();
    }
  );

}
  logout(){
    this.router.navigate(['/login']);
  } 
}
