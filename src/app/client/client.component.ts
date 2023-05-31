import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/User';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  currentUser: User | null = null;
  product!: Product; // Le produit à ajouter
  categories: Category[] = [];
  articles: Product[] = [];

  favoriteProducts: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private router: Router,
    private categorieService: CategoryService,
    private produitService: ProductService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {this.product = new Product();}

  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      this.authService.getCurrentUser(authToken).subscribe(user => {
        this.currentUser = user;
      });
    }
 

    this.categories = this.route.snapshot.data['categories'];
    this.articles = this.route.snapshot.data['articles'];
    this.loadArticles();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log('An error occurred.');
      },
      () => {
        console.log('Loading categories was done.');
      }
    );
  }

  loadArticles(): void {
    this.produitService.getAllProducts().subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.log('An error occurred.');
      },
      () => {
        console.log('Loading articles was done.');
      }
    );
  }

  toggleHeartIcon(event: Event, article: Product): void {
    event.preventDefault();

    article.isFavorite = !article.isFavorite;

    if (article.isFavorite) {
      this.favoriteProducts.push(article);
    } else {
      const index = this.favoriteProducts.findIndex(favorite => favorite.id === article.id);
      if (index !== -1) {
        this.favoriteProducts.splice(index, 1);
      }
    }

    // Update the localStorage with the new list of favorite products for the current user
    localStorage.setItem(`favoriteProducts_${this.currentUser?.id}`, JSON.stringify(this.favoriteProducts));
  }

  getHeartIconClass(article: Product): string {
    return article.isFavorite ? 'fas fa-heart' : 'far fa-heart';
  }

  onCategoryClick(id: any): void {
    this.router.navigate(['categorie', id]);
  }

  logout(): void {
    // Perform logout operations here

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  favorites: Product[] = [];



  addToCart(product: Product): void {
    // Ajouter le produit au panier
    this.favorites.push(product);

    // Mettre à jour le localStorage avec les produits du panier
    try {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      alert('Produit ajouté au panier avec succès !');
    } catch (error) {
      alert('Erreur lors de la sauvegarde du panier dans le localStorage.');
    }
  }
}
  
  