import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/produto.model';
import { Header } from '../header/header';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule, Header],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CardListComponent implements OnInit {
  products: Product[] = [];
  error: string = '';
  loading: boolean = true;

  private produtoService = inject(ProdutoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  protected isModalOpen = signal(false);
  protected selectedProductId = signal<string | null>(null);

  protected productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    'img-url': new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+/)])
  });

  constructor() {}

  ngOnInit() {
    console.log('CardListComponent OnInit iniciado');
    this.loadProducts();
  }

  private loadProducts() {
    this.loading = true;
    this.produtoService.listar().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.products = data;
        this.loading = false;
        this.error = '';
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.error = `Erro ao carregar produtos: ${err.status} - ${err.statusText}`;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  toggleModal() {
    this.isModalOpen.update(v => !v);
    if (!this.isModalOpen()) {
      this.productForm.reset();
      this.selectedProductId.set(null);
    }
  }

  editProduct(product: Product) {
    this.selectedProductId.set(product.id);
    this.isModalOpen.set(true);
    
    this.productForm.patchValue({
      name: product.name,
      descricao: product.descricao,
      'img-url': product['img-url']
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const data = this.productForm.value;
    const id = this.selectedProductId();

    if (id) {
      // Lógica do PUT (Edição)
      this.produtoService.updateProduct(id, data).subscribe({
        next: () => {
          console.log('Produto atualizado com sucesso!');
          this.finalizeAction();
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          alert('Erro ao atualizar: ' + err.error?.message || err.message);
        }
      });
    } else {
      // Lógica do POST (Criação)
      this.produtoService.saveProduct(data as any).subscribe({
        next: () => {
          console.log('Produto criado com sucesso!');
          this.finalizeAction();
        },
        error: (err) => {
          console.error('Erro ao criar produto:', err);
          alert('Erro ao criar: ' + err.error?.message || err.message);
        }
      });
    }
  }

  private finalizeAction() {
    this.toggleModal();
    this.productForm.reset();
    this.selectedProductId.set(null);
    this.loadProducts();
  }

  deleteProduct(id: string) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Produto excluído!');
          this.loadProducts(); // Atualiza a lista na tela após excluir
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
