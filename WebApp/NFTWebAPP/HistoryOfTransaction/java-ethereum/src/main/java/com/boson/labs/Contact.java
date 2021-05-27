package com.boson.labs;

public class Contact {
	
	public String Hash;
	  public String From_Address;
	  public String To_Address;
	  public String Block;
	  
	  public String Balance;
	  
	  public Contact(String Hash, String From_Address, String To_Address,String Block,String Balance) {
			    this.Hash =Hash ;
			    this.From_Address = From_Address;
			    this.To_Address = To_Address;
			    this.Block = Block;
			    this.Balance = Balance;
			  }

}
