package algorand.test;

import com.algorand.algosdk.account.Account;
import com.algorand.algosdk.v2.client.common.AlgodClient;
import com.algorand.algosdk.v2.client.model.PendingTransactionResponse;
import com.algorand.algosdk.v2.client.model.TransactionParametersResponse;
import com.algorand.algosdk.v2.client.model.PostTransactionsResponse;
import com.algorand.algosdk.transaction.SignedTransaction;
import com.algorand.algosdk.transaction.Transaction;
import com.algorand.algosdk.util.Encoder;
import org.apache.commons.lang3.ArrayUtils;

public class App {
    // Function from Algorand Inc. - Utility function to wait on a transaction to be
    // confirmed
    public static void waitForConfirmation(AlgodClient client, String txID, String[] headers, String[] values)
            throws Exception {
        Long lastRound = client.GetStatus().execute(headers, values).body().lastRound;
        while (true) {
            try {
                // Check the pending tranactions
                PendingTransactionResponse pendingInfo = client.PendingTransactionInformation(txID)
                        .execute(headers, values).body();
                if (pendingInfo.confirmedRound != null && pendingInfo.confirmedRound > 0) {
                    System.out.println("Transaction confirmed in round " + pendingInfo.confirmedRound);
                    break;
                }
                lastRound++;
                client.WaitForBlock(lastRound).execute(headers, values);
            } catch (Exception e) {
                throw (e);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        final String ALGOD_API_ADDR = "https://testnet-algorand.api.purestake.io/ps2";
        final int ALGOD_PORT = 443;
        final String ALGOD_API_TOKEN = "";

        String[] headers = { "X-API-Key" };
        String[] values = { "ZEsvuOZECGhA7IqRiNrIvPPa7NNJZ6T8aH6SVeGiyW" };

        AlgodClient client = new AlgodClient(ALGOD_API_ADDR, ALGOD_PORT, ALGOD_API_TOKEN);

        final String SRC_ACCOUNT = "lab winter life auction gate boy bubble mouse focus enter quantum plunge drop clinic gym diet winner promote better arrest merry slam latin absorb eager";
        Account src = new Account(SRC_ACCOUNT);

        final String DEST_ADDR = "ZHGZZQ2PIWYRK6MIK44GKO3VGQUC7NS2V3UQ63M3DIMFUFGI4BRWK7WDBU";

        TransactionParametersResponse params = client.TransactionParams().execute(headers, values).body();
        Long amount = 10L;

        Transaction tx = Transaction.PaymentTransactionBuilder().sender(src.getAddress()).receiver(DEST_ADDR).amount(amount).suggestedParams(params).build();

        SignedTransaction signedTx = src.signTransaction(tx);

        // send the transaction to the network
        try {
            String[] txHeaders = ArrayUtils.add(headers, "Content-Type");
            String[] txValues = ArrayUtils.add(values, "application/x-binary");
            byte[] encodedTxBytes = Encoder.encodeToMsgPack(signedTx);
            PostTransactionsResponse txResponse = client.RawTransaction().rawtxn(encodedTxBytes)
                    .execute(txHeaders, txValues).body();
            System.out.println("Transaction sent with ID " + txResponse.txId);
            waitForConfirmation(client, txResponse.txId, headers, values);
        } catch (Exception e) {
            System.err.println("Exception when calling algod#rawTransaction: " + e);
        }
    }
}