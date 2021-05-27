package com.boson.labs;
import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.Set;
import java.util.concurrent.ExecutionException;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.http.HttpService;

public class Main {
	
	
	private static String[] columns = { "Hash", "From_Address", "To_Address","Block","Balace"};
	//private static List<Contact> contacts = new ArrayList<Contact>();

	private static Set<Contact> hashSet = new HashSet<Contact>(); 

	public static void main(String[] args) throws IOException, ParseException,InvalidFormatException{
		
		
		//Web3j web3 = Web3j.build(new HttpService("http://localhost:7545"));
		
		// connect to node
		//https:rinkeby.infura.io/v3/ee1d81155b6b41d491f81a899176c509
		Web3j web3 = Web3j.build(new HttpService("https://rinkeby.infura.io/v3/ee1d81155b6b41d491f81a899176c509"));
		
		
		
		//MainNet
		//Web3j web3 = Web3j.build(new HttpService("https://mainnet.infura.io/v3/ee1d81155b6b41d491f81a899176c509"));
		

		
		//create excel file
		
		
		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Contacts");
		
		
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerFont.setFontHeightInPoints((short) 14);
		headerFont.setColor(IndexedColors.RED.getIndex());

		CellStyle headerCellStyle = workbook.createCellStyle();
		headerCellStyle.setFont(headerFont);
		
		Row headerRow = sheet.createRow(0);


		
		
		for (int j = 0; j < columns.length; j++) {
			 
			 
			  Cell cell = headerRow.createCell(j);
			  cell.setCellValue(columns[j]);
			  cell.setCellStyle(headerCellStyle);
			}
			
			int rowNum2 = 1;
		 System.out.println("Connecting to Ethereum ...");
		 
		 try {
			 
			 //0x176C8f414729498990cF6a877066026063Cf398F
			 //original 0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3
			 //https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=0x0e3a2a1f2146d86a604adc220b4967a898d7fe07&apikey=YourApiKeyToken
			 //String urll="http://api-cn.etherscan.com/api?module=account&action=tokentx&contractaddress=0xdbb163b22e839a26d2a5011841cb4430019020f9&page=1&offset=10&sort=desc&apikey=9EFYVV4BAJS2M3M3ADUFN8G8XTCTAMR7R9";
			 
			 String urll="https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0xdbb163b22e839a26d2a5011841cb4430019020f9&page=1&offset=10&sort=asc&apikey=9EFYVV4BAJS2M3M3ADUFN8G8XTCTAMR7R9";
			 
			 URL obj=new URL(urll);
			 
			 //HttpUrlConnection con=(HttpUrlConnection) obj.openConnection();
			
			//URL url = new URL("http://api-cn.etherscan.com/api?module=account&action=tokentx&contractaddress=0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3&page=1&offset=10&sort=desc&apikey=9EFYVV4BAJS2M3M3ADUFN8G8XTCTAMR7R9");
			 try {
				HttpURLConnection conn = (HttpURLConnection)obj.openConnection();
				 conn.setRequestMethod("GET");
				 conn.setRequestProperty("User-Agent","Mozila/5.0");
				 conn.connect(); 
				 int responsecode = conn.getResponseCode(); 
				 
				 System.out.print("Response code "+responsecode);
				 
				 BufferedReader br=new BufferedReader(new InputStreamReader(conn.getInputStream()));
				 
				 String inputline;
				 StringBuffer res=new StringBuffer();
				 
				 while((inputline = br.readLine())!= null) {
					 
					 res.append(inputline);
				 }
				 
				 br.close();
				 
				 System.out.println("Json Format");
				 System.out.println(res.toString());
				 
				 JSONObject myresponse=new JSONObject(res.toString());
				 
				 System.out.println("Hash address"+myresponse.get("result"));
				 
				 JSONArray jsonarr_1 = (JSONArray) myresponse.get("result"); 

				 

				 
				 for(int i=0;i<jsonarr_1.length();i++) {
					 
					 JSONObject jso=(JSONObject)jsonarr_1.get(i);
					 
					 //System.out.println("checking Loop Inside");

					 System.out.println("");
					 
					 System.out.println("Hash Getting -------"+i+"=== "+jso.get("hash"));
					 
					 String a=(String) jso.get("hash");
					 
					 String b=(String) jso.get("from");
					 
					 String c=(String) jso.get("to");
					 
					 String d=(String) jso.get("blockHash");
					 
					 System.out.print(a);
					 
					 //contacts.add(new Contact(a,b,c,d ));
					 
					 	//hashSet.add(Arrays.asList(new String[] {a,b,c,d}));
					 
					 
					 EthGetBalance ethGetBalance;
						BigInteger wei=null ;
						try {
							ethGetBalance = web3
							        .ethGetBalance("0xEBB8509A162bAf75A48A3e4d33e8dda28D148284", DefaultBlockParameterName.LATEST)
							        .sendAsync()
							        .get();
							wei= ethGetBalance.getBalance();
							
							System.out.println("Balance"+wei);
							
						} catch (InterruptedException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						} catch (ExecutionException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}



					 
					 hashSet.add(new Contact(a,b,c,d,wei.toString()));
					 
					 
					 //System.out.println(contacts);
					 
					 System.out.println("");
					 
					 //System.out.println("From address Getting ------ "+i+"=== "+jso.get("from"));
					 
					 System.out.println("To address Getting ------ "+i+"=== "+jso.get("to"));
					 
					 //System.out.println("BlockHash address Getting ------ "+i+"=== "+jso.get("blockHash"));

					 
					
				 }

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 


		} catch (MalformedURLException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		 
		 
		 System.out.println(hashSet.size());
		 
		 
		 
		 
			for (Contact contact : hashSet) {
				
				
								
				
				
				
//			Web3j web3 = Web3jFactory.build(new HttpService("https://ropsten.infura.io/your-token"));
//
//			    String strAddress="0xEBB8509A162bAf75A48A3e4d33e8dda28D148284"; //strAddress is your wallet address
//			    EthGetBalance ethGetBalance2;
//				try {
//					ethGetBalance2 = web3.ethGetBalance(strAddress,DefaultBlockParameterName.LATEST).sendAsync().get();
//					
//					//BigInteger wei2 = ethGetBalance.getBalance();
//				    
//					//System.out.println("Balance"+wei2);
//					
//				} catch (InterruptedException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				} catch (ExecutionException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//
//			    


				

				

															
				  	  Row row = sheet.createRow(rowNum2++);
					  row.createCell(0).setCellValue(contact.Block);
					  row.createCell(1).setCellValue(contact.From_Address);
					  row.createCell(2).setCellValue(contact.To_Address);
					  row.createCell(3).setCellValue(contact.Hash);
					  row.createCell(4).setCellValue(contact.Balance);
					
				
				
				//System.out.println(contacts);
			  
			}

			// Resize all columns to fit the content size
			for (int k = 0; k < columns.length; k++) {
			  sheet.autoSizeColumn(k);
			}
			
			
			FileOutputStream fileOutt = new FileOutputStream("contacts.xlsx");
			workbook.write(fileOutt);
			fileOutt.close();

			
			

	
			
	}

}
