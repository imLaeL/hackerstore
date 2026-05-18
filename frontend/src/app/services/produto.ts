import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly API = 'http://localhost:8080/produto';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Product[]>(this.API);
  }

  saveProduct(product: Partial<Product>) {
    return this.http.post<Product>(this.API, product);
  }

  updateProduct(id: string, productData: any) {
    return this.http.put<void>(`${this.API}/${id}`, productData);
  }

  deleteProduct(id: string) {
  return this.http.delete<void>(`${this.API}/${id}`);
}

}