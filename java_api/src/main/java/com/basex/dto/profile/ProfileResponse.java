package com.basex.dto.profile;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class ProfileResponse {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
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
}
