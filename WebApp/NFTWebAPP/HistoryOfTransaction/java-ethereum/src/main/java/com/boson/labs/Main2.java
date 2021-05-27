/*
 * package com.boson.labs;
 * 
 * import java.io.IOException; import java.math.BigInteger;
 * 
 * import org.web3j.protocol.Web3j; import
 * org.web3j.protocol.core.DefaultBlockParameter; import
 * org.web3j.protocol.core.methods.request.Transaction; import
 * org.web3j.protocol.core.methods.response.EthCall; import
 * org.web3j.protocol.core.methods.response.EthGetCode; import
 * org.web3j.protocol.core.methods.response.EthSendTransaction; import
 * org.web3j.tx.TransactionManager;
 * 
 * 
 * public class Main2 extends TransactionManager { private final Web3j web3j;
 * private String fromAddress;
 * 
 * public Main2(Web3j web3j, String fromAddress) { super(web3j, fromAddress);
 * this.web3j = web3j; this.fromAddress = fromAddress; }
 * 
 * public EthSendTransaction sendTransaction( BigInteger gasPrice, BigInteger
 * gasLimit, String to, String data, BigInteger value, boolean constructor)
 * throws IOException { throw new UnsupportedOperationException(
 * "Only read operations are supported by this transaction manager"); }
 * 
 * public EthSendTransaction sendTransactionEIP1559( BigInteger gasPremium,
 * BigInteger feeCap, BigInteger gasLimit, String to, String data, BigInteger
 * value, boolean constructor) throws IOException { throw new
 * UnsupportedOperationException(
 * "Only read operations are supported by this transaction manager"); }
 * 
 * @Override public String sendCall(String to, String data,
 * DefaultBlockParameter defaultBlockParameter) throws IOException { EthCall
 * ethCall = web3j.ethCall( Transaction.createEthCallTransaction(fromAddress,
 * to, data), defaultBlockParameter) .send();
 * 
 * assertCallNotReverted(ethCall); return ethCall.getValue(); }
 * 
 * private void assertCallNotReverted(EthCall ethCall) { // TODO Auto-generated
 * method stub
 * 
 * }
 * 
 * public EthGetCode getCode( final String contractAddress, final
 * DefaultBlockParameter defaultBlockParameter) throws IOException { return
 * web3j.ethGetCode(contractAddress, defaultBlockParameter).send(); }
 * 
 * @Override public EthSendTransaction sendTransaction(BigInteger gasPrice,
 * BigInteger gasLimit, String to, String data, BigInteger value) throws
 * IOException { // TODO Auto-generated method stub return null; } }
 */