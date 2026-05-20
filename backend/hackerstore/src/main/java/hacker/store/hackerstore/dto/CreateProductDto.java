package hacker.store.hackerstore.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateProductDto(String name, String descricao, @JsonProperty("img-url") String imgUrl) {

}

