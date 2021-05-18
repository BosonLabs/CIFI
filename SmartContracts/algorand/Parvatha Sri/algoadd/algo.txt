public class ExportAccount {
    public static void main(String args[]) throws Exception {
        //Get the values for the following two settings in the
        //kmd.net and kmd.token files within the data directory 
        //of your node.        
        final String KMD_API_ADDR = "<kmd-address>";
        final String KMD_API_TOKEN = "<kmd-token>";

        // Create a wallet with kmd rest api
        KmdClient client = new KmdClient();
        client.setBasePath(KMD_API_ADDR);
        // Configure API key authorization: api_key
        ApiKeyAuth api_key = (ApiKeyAuth) client.getAuthentication("api_key");
        api_key.setApiKey(KMD_API_TOKEN);
        KmdApi kmdApiInstance = new KmdApi(client);
