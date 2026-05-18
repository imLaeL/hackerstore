package hacker.store.hackerstore.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "product")
@Getter @Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "descricao")
    private String descricao;

    @JsonProperty("img-url")
    @Column(name = "img_url")
    private String imgUrl;

    @CreationTimestamp
    private Instant creationTimeStamp;

    @UpdateTimestamp
    private Instant updateTimeStamp;

    public Product() {
    }
}
