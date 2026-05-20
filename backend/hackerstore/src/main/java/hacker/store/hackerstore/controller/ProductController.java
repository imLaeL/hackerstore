package hacker.store.hackerstore.controller;

import hacker.store.hackerstore.entity.Product;
import hacker.store.hackerstore.service.ProductService;
import hacker.store.hackerstore.dto.CreateProductDto;
import hacker.store.hackerstore.dto.UpdateProductDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Void> createProduct(@RequestBody CreateProductDto createProductDto) {
        var productId = productService.createProduct(createProductDto);
        return ResponseEntity.created(URI.create("/produto/" + productId.toString())).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") UUID id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Product>> listProducts() {
        var products = productService.listProducts();
        return ResponseEntity.ok(products);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProductById(@PathVariable("id") UUID id, @RequestBody UpdateProductDto updateProductDto) {
        productService.updateById(id, updateProductDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
