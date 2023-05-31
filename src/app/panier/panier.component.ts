import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  favorites: Product[] = [];

  constructor(    private produitService: ProductService
    ) { }
  ngOnInit(): void {
    this.loadFavorites();
    //this.loadArticles();
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
  articles: Product[] = [];
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
}
