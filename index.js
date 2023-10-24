const config = require('./config.json');
const authLib = require('./lib/salesforceAuth.js');
const SalesforceApi = require('./lib/SalesforceApi.js');

main();

async function main() {
  const authToken = await authLib.authenticate(config);
  const salesforceApi = new SalesforceApi(authToken, 'Account', config.myDomain, config.apiVersion);
  const accountsResponse = await salesforceApi.fetchList();

  console.log('>>> Account List Response: ', accountsResponse);
}
