package hacker.store.hackerstore.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateProductDto(String name, String descricao, @JsonProperty("img-url") String imgUrl) {
}
