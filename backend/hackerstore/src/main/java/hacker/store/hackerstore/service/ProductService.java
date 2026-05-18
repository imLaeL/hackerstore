package hacker.store.hackerstore.service;

import hacker.store.hackerstore.controller.CreateProductDto;
import hacker.store.hackerstore.controller.UpdateProductDto;
import hacker.store.hackerstore.entity.Product;
import hacker.store.hackerstore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public UUID createProduct(CreateProductDto createProductDto) {

        var entity = new Product();
        entity.setName(createProductDto.name());
        entity.setDescricao(createProductDto.descricao());
        entity.setImgUrl(createProductDto.imgUrl());
        entity.setCreationTimeStamp(Instant.now());
        entity.setUpdateTimeStamp(null);

        var productSaved = productRepository.save(entity);

        return productSaved.getId();
    }

    public Optional<Product> getProductById(UUID id) {
        return productRepository.findById(id);
    }

    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    public void updateById(UUID id, UpdateProductDto updateProductDto) {
        var productEntity = productRepository.findById(id);
        if (productEntity.isPresent()) {
            var product = productEntity.get();

            if (updateProductDto != null) {
                if (updateProductDto.name() != null) {
                    product.setName(updateProductDto.name());
                }

                if (updateProductDto.descricao() != null) {
                    product.setDescricao(updateProductDto.descricao());
                }

                if (updateProductDto.imgUrl() != null) {
                    product.setImgUrl(updateProductDto.imgUrl());
                }

                product.setUpdateTimeStamp(Instant.now());
            }

            productRepository.save(product);
        }
    }

    public void deleteById(UUID id) {
       var userExists = productRepository.existsById(id);
       if (userExists) {
           productRepository.deleteById(id);
       }
    }
}
