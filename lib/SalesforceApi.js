require('isomorphic-fetch');

class SalesforceApi {
  accessToken;
  objectApiName;
  baseUrl;
  apiVersion;
  baseFetchUrl;
  standardUrl;
  compositeUrl;
  fetchOptions;

  constructor(accessToken, objectApiName, baseUrl, apiVersion) {
    this.accessToken = accessToken;
    this.objectApiName = objectApiName;
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
    this.baseFetchUrl = this.prepareBaseFetchUrl();
    this.standardUrl = this.prepareStandardUrl();
    this.compositeUrl = this.prepareCompositeUrl();
    this.fetchOptions = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
  }

  prepareBaseFetchUrl() {
    const url = new URL(`${this.baseUrl}/services/data/v${this.apiVersion}/query`);
    return url;
  }

  prepareStandardUrl() {
    const url = new URL(`${this.baseUrl}/services/data/v${this.apiVersion}/sobjects/${this.objectApiName}`);
    return url;
  }

  prepareCompositeUrl() {
    const url = new URL(`${this.baseUrl}/services/data/v${this.apiVersion}/composite/tree/${this.objectApiName}`);
    return url;
  }

  async fetchList() {
    const fetchOptions = {
      ...this.fetchOptions,
      method: 'GET',
    };

    const response = await fetch(this.standardUrl, fetchOptions);
    const responseBody = await response.json();

    return responseBody;
  }
}

module.exports = SalesforceApi;
