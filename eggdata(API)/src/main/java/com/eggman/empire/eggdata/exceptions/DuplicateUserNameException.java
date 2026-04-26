package com.eggman.empire.eggdata.exceptions;

public class DuplicateUserNameException extends RuntimeException {

  public DuplicateUserNameException(String userName) {
    super("Atenção: Já existe um membro do Império Eggman registrado com o este nome de usuário: " + userName);
  }
}