'use strict';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  static token = null;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Takes query string.
   * Returns array of companies like
   * [{ handle, name, description, numEmployees, logoUrl }...].
   */

  static async getCompanies(query='') {
    const data = query ? {nameLike: query} : {};
    const res = await this.request("companies", data);
    return res.companies;
  }

  /** Takes query string.
   * Returns array of jobs like
   * [ { id, title, salary, equity, companyHandle, companyName }, ...].
   */

  static async getJobs(query) {
    const data = query ? {title: query} : {};
    const res = await this.request("jobs", data);
    return res.jobs;
  }

  /** Takes username, password. Validates user credentials and returns JWT token.
   */

  static async login(username, password) {
    const data = { username, password }
    const respData = await this.request("auth/token", data, 'POST');
    if ('token' in respData) this.token = respData.token;
    return respData;
  }

  /** Creates new user.
   * Takes object like {username, password, firstName, lastName, email}.
   * Returns JWT token.
   */

  static async signup(inputValues) {
    const respData =  await this.request("auth/register", inputValues, 'POST');
    if ('token' in respData) this.token = respData.token;
    return respData;
  }

  /** Gets user info.
   * Takes username.
   * Returns object like { username, firstName, lastName, email, isAdmin, jobs }
   * where jobs is { id, title, companyHandle, companyName, state }
   */

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Takes obj like {username, firstName, lastName, email}
   * and updates user info.
   * Returns updated info like {username, firstName, lastName, email, isAdmin }
   * */
  static async updateUser({username, ...data}) {
    const res = await this.request(`users/${username}`, data, 'PATCH');
    return res.user;
  }
}

export default JoblyApi;
