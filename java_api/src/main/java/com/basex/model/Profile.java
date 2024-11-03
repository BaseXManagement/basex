package com.basex.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(Types.VARCHAR)
    private UUID id;

    private String email;
    private String firstName;
    private String lastName;
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private String image;
    private Date dob;
    private String address;
    private Long phoneNo;
    private String nextOfKinName;
    private String nextOfKinPhoneNr;
    private String bankDetailsBankName;
    private String bankDetailsBankSortCode;
    private String bankDetailsAccountNr;
    private Long utrNo;
    private Double rate;
    private String positionRole;
    private Date positionStartDate;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
