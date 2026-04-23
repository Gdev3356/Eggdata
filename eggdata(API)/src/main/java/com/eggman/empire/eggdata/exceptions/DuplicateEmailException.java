package com.eggman.empire.eggdata.exceptions;

public class DuplicateEmailException extends RuntimeException {
  public DuplicateEmailException(String email) {
    super("There is already a user registered in the email: " + email);
  }
}