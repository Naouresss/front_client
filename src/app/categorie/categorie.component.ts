import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  products: Product[] = [];
  id!: number;
  currentUser: User | undefined;
  constructor(private productService: ProductService, private accountService: AccountService,private route: ActivatedRoute,private categorieService: CategoryService ,private produitService: ProductService ,private router: Router) { 
    const storedFavoriteProductsByUser = localStorage.getItem('favoriteProductsByUser');
if (storedFavoriteProductsByUser) {
  this.favoriteProductsByUser = new Map<number, Product[]>(JSON.parse(storedFavoriteProductsByUser));
}
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllProductsByCategory();
    // Récupérer la liste des favoris depuis le localStorage
 
    this.categories = this.route.snapshot.data['categories'];
    this.articles = this.route.snapshot.data['articles'];
    this.loadArticles();
    this.loadCategories();
    this.currentUser = this.accountService.getCurrentUser();
    this.currentUser = this.accountService.getCurrentUser();
    const userId = this.currentUser?.id; // Utilisez l'opérateur de questionnement pour éviter une erreur si currentUser est undefined

      // Récupérer les produits favoris de l'utilisateur spécifique
      const storedFavoriteProductsByUser = localStorage.getItem('favoriteProductsByUser');
      if (storedFavoriteProductsByUser) {
        this.favoriteProductsByUser = new Map<number, Product[]>(JSON.parse(storedFavoriteProductsByUser));
      }
  }
  onCategoryClick(id: any): void {
    this.router.navigateByUrl('/categorie/' + id).then(() => {
      window.location.reload();
    });
  }
  getAllProductsByCategory(): void {
    this.productService.getAllProductByCategory(this.id)
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des produits.', error);
        }
      );
  }
      categories!: Category[];
      articles!:Product[];


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

        produits: Product[] = []; 
        favoriteProducts: Product[] = [];

        /*toggleHeartIcon(event: Event, article: Product) {
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

    // Mettre à jour le localStorage avec la nouvelle liste des favoris
    localStorage.setItem('favoriteProducts', JSON.stringify(this.favoriteProducts));
  }*/
  favoriteProductsByUser: Map<number, Product[]> = new Map<number, Product[]>();

  toggleHeartIcon(event: Event, article: Product) {
    event.preventDefault();
  
    article.isFavorite = !article.isFavorite;
   
    this.currentUser = this.accountService.getCurrentUser();
    const userId = this.currentUser?.id; // Utilisez l'opérateur de questionnement pour éviter une erreur si currentUser est undefined
    if (userId) {
      if (!this.favoriteProductsByUser.has(userId)) {
        this.favoriteProductsByUser.set(userId, []);
      }
      const favoriteProducts = this.favoriteProductsByUser.get(userId);
      if (favoriteProducts) {
        if (article.isFavorite) {
          favoriteProducts.push(article);
        } else {
          const index = favoriteProducts.findIndex(favorite => favorite.id === article.id);
          if (index !== -1) {
            favoriteProducts.splice(index, 1);
          }
        }
      }
      // Mettre à jour le localStorage avec la nouvelle liste des favoris
      localStorage.setItem('favoriteProductsByUser', JSON.stringify(Array.from(this.favoriteProductsByUser.entries())));
    }
  }
  




    getHeartIconClass(article: Product): string {
      return article.isFavorite ? 'fas fa-heart' : 'far fa-heart';
    }

}
