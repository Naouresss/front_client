import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/User';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  /*currentUser: User | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private router : Router
  ) {
  }
  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      this.authService.getCurrentUser(authToken).subscribe(user => {
        this.currentUser = user;
      });
    }
}*/
onCategoryClick(id: any): void {
  this.router.navigateByUrl('/login')
}
categories!: Category[];
articles!:Product[];
constructor(private categorieService: CategoryService ,private produitService: ProductService ,private route: ActivatedRoute,private router: Router) {
  this.loadCategories();
}
ngOnInit() {

  this.categories = this.route.snapshot.data['categories'];
  this.articles = this.route.snapshot.data['articles'];
  this.loadArticles();
  this.loadCategories();
    }
loadCategories(){
  this.categorieService.getAllCategories().subscribe(
    data => {this.categories=data},
    error =>{console.log('An error was occured.')},
  () => {console.log('loading produits was done.')}
    );
}
loadArticles(){
  this.produitService.getAllProducts().subscribe(
    data => {this.articles=data},
    error =>{console.log('An error was occured.')},
  () => {console.log('loading produits was done.')}
    );
}
}
