package algorandprogram.test;
import java.math.BigInteger;
import com.algorand.algosdk.v2.client.common.AlgodClient;
import com.algorand.algosdk.account.Account;
import org.json.JSONArray;
import org.json.JSONObject;
import com.algorand.algosdk.v2.client.common.*;
import com.algorand.algosdk.algod.client.ApiException;
import com.algorand.algosdk.crypto.Address;
import com.algorand.algosdk.transaction.SignedTransaction;
import com.algorand.algosdk.v2.client.model.PendingTransactionResponse;
import com.algorand.algosdk.v2.client.model.TransactionParametersResponse;
import com.algorand.algosdk.transaction.Transaction;
import com.algorand.algosdk.util.Encoder;

// Show Creating, modifying, sending and listing assets
public class AssetExample {

public AlgodClient client = null;

// utility function to connect to a node
private AlgodClient connectToNetwork() {
    // final String ALGOD_API_ADDR = "<var>algod-address</var>";
    // final String ALGOD_API_TOKEN = "<var>algod-token</var>";
        final String ALGOD_API_ADDR = "https://api.testnet.algoexplorer.io";
        final int ALGOD_PORT = 443;
        final String ALGOD_API_TOKEN = "3D4YHZ7Scg3Ucg5sMA8xl8NghVCpeoRT7f3NNk3I";

   // final String ALGOD_API_ADDR = "localhost";
   // final int ALGOD_PORT = 4001;
   // final String ALGOD_API_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    // instantiate the algod wrapper
    AlgodClient client = new AlgodClient(ALGOD_API_ADDR, ALGOD_PORT, ALGOD_API_TOKEN);
    return client;
}

// utility function to print created asset
public void printCreatedAsset(Account account, Long assetID) throws Exception {
    if (client == null)
        this.client = connectToNetwork();
    String accountInfo = client.AccountInformation(account.getAddress()).execute().toString();
    JSONObject jsonObj = new JSONObject(accountInfo.toString());
    JSONArray jsonArray = (JSONArray) jsonObj.get("created-assets");
    if (jsonArray.length() > 0) {
        try {
            for (int i = 0; i < jsonArray.length(); i++)  {
                {
                JSONObject ca = (JSONObject) jsonArray.getJSONObject(i);
                Integer myassetIDInt = (Integer) ca.get("index");
                if (assetID.longValue() == myassetIDInt.longValue()) {
                    System.out.println("Created Asset Info: " + ca.toString(2)); // pretty print
                    break;
                }
            }
        }
        
        } catch (Exception e) {
            throw (e);
        }
    }
}

// utility function to print asset holding
public void printAssetHolding(Account account, Long assetID) throws Exception {
    if (client == null)
        this.client = connectToNetwork();
    String accountInfo = client.AccountInformation(account.getAddress()).execute().toString();
    JSONObject jsonObj = new JSONObject(accountInfo.toString());
    JSONArray jsonArray = (JSONArray) jsonObj.get("assets");
    if (jsonArray.length() > 0) {
        try {
            for (int i = 0; i < jsonArray.length(); i++)  {
                {
                JSONObject ca = (JSONObject) jsonArray.getJSONObject(i);
                Integer myassetIDInt = (Integer) ca.get("asset-id");
                if (assetID.longValue() == myassetIDInt.longValue()) {
                    System.out.println("Asset Holding Info: " + ca.toString(2)); // pretty print
                    break;
                }
            }
        }
        } catch (Exception e) {
            throw (e);
        }
    }
}

// utility function to wait on a transaction to be confirmed

public void waitForConfirmation(String txID) throws Exception {
    if (client == null)
        this.client = connectToNetwork();

    Long lastRound = client.GetStatus().execute().body().lastRound;

    while (true) {
        try {
            // Check the pending tranactions
            Response<PendingTransactionResponse> pendingInfo = client.PendingTransactionInformation(txID).execute();
            if (pendingInfo.body().confirmedRound != null && pendingInfo.body().confirmedRound > 0) {
                // Got the completed Transaction
                System.out.println(
                        "Transaction " + txID + " confirmed in round " + pendingInfo.body().confirmedRound);
                break;
            }
            lastRound++;
            client.WaitForBlock(lastRound).execute();
        } catch (Exception e) {
            throw (e);
        }
    }
}


// Utility function for sending a raw signed transaction to the network
public String submitTransaction(SignedTransaction signedTx) throws Exception {
    try {
        // Msgpack encode the signed transaction
        byte[] encodedTxBytes = Encoder.encodeToMsgPack(signedTx);
        String id = client.RawTransaction().rawtxn(encodedTxBytes).execute().body().txId;
        ;
        return (id);
    } catch (ApiException e) {
        throw (e);
    }
}

public void assetExample() throws Exception {
    if (client == null)
        this.client = connectToNetwork();
    // recover example accounts


    final String account1_mnemonic = "feel element energy common cave chicken addict veteran holiday layer wise will repair blame crazy cloth violin ripple receive ancient identify outer green abandon tattoo";
    final String account2_mnemonic = "accident steel drip despair seminar pioneer nation type ill joy sudden future fade step drill galaxy rabbit city win bicycle october wait business above cook";
    final String account3_mnemonic = "logic remain present news pipe jacket harsh grief permit hamster scrap omit distance obey good crime dutch special calm mango aware yard wedding about misery";


    Account acct1 = new Account(account1_mnemonic);
    Account acct2 = new Account(account2_mnemonic);
    Account acct3 = new Account(account3_mnemonic);
    System.out.println("Account1: " + acct1.getAddress());
    System.out.println("Account2: " + acct2.getAddress());
    System.out.println("Account3: " + acct3.getAddress());

    // CREATE ASSET
    // get changing network parameters for each transaction
    TransactionParametersResponse params = client.TransactionParams().execute().body();
    params.fee = (long) 1000;

    // Create the Asset:
    BigInteger assetTotal = BigInteger.valueOf(10000);
    boolean defaultFrozen = false;
    String unitName = "myunit";
    String assetName = "my longer asset name";
    String url = "http://this.test.com";
    String assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
    Address manager = acct2.getAddress();
    Address reserve = acct2.getAddress();
    Address freeze = acct2.getAddress();
    Address clawback = acct2.getAddress();
    Integer decimals = 0;
    Transaction tx = Transaction.AssetCreateTransactionBuilder().sender(acct1.getAddress()).assetTotal(assetTotal)
            .assetDecimals(decimals).assetUnitName(unitName).assetName(assetName).url(url)
            .metadataHashUTF8(assetMetadataHash).manager(manager).reserve(reserve).freeze(freeze)
            .defaultFrozen(defaultFrozen).clawback(clawback).suggestedParams(params).build();

    // Sign the Transaction with creator account
    SignedTransaction signedTx = acct1.signTransaction(tx);
    Long assetID = null;
    try {
        String id = submitTransaction(signedTx);
        System.out.println("Transaction ID: " + id);
        waitForConfirmation(id);
        // Read the transaction
        PendingTransactionResponse pTrx = client.PendingTransactionInformation(id).execute().body();
        // Now that the transaction is confirmed we can get the assetID
        assetID = pTrx.assetIndex;
        System.out.println("AssetID = " + assetID);
        printCreatedAsset(acct1, assetID);
        printAssetHolding(acct1, assetID);

    } catch (Exception e) {
        e.printStackTrace();
        return;
    }

}

public static void main(String args[]) throws Exception {

    AssetExample ex = new AssetExample();
    ex.assetExample();
}
}

// Copy off the AssetID, as it will be used in subsequent steps.



