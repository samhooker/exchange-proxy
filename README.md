# Simple API Proxy
I needed a simple way to get around CORS errors that I was facing when trying to access an API via a web browser. Since I couldn't alter the API's *Access-Control-Allow-Origin* header, I needed to do something else.

Here's the trick: CORS errors are browser-specific. By using a proxy, the call to the remote API wasn't coming from a browser.

## Tools
I built a proxy on a NodeJS server that primarily leverages ExpressJS.

### Express
I used [ExpressJS](https://expressjs.com/) to handle the routing. It's fast, robust, and uncomplicated. It only took a few lines of code to parse a URL & query string to grab the data I needed from the remote API and pass it back to my application.

Since the object here was to provide open access, I limited the *Access-Control-Allow-Methods* to GET. That allowed me to set *Access-Control-Allow-Origin* to * (wildcard) without making my proxy a convenient tool for the black hats to spam the remote APIs I'm proxying with attacks.

### Dotenv
I use **Dotenv** on just about every NodeJS project. It's an easy, secure means of obfuscating data that the server needs, but that users (hackers) shouldn't be able to access. In this case, I'm only using it to set up the port number used by the proxy server (change it in the .env file if you want).

Learn more about Dotenv on [Github](https://github.com/motdotla/dotenv) or [NPM](https://www.npmjs.com/package/dotenv).

### node-fetch
This project also uses [node-fetch](https://www.npmjs.com/package/node-fetch) because the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) isn't natively available in NodeJS. This package fixes that.

### FXdata
[FXdata](https://fxdata.foorilla.com/) "provides a free and open API to access historical foreign exchange rates in USD based on statistical data provided by the Bank for International Settlements (BIS)." I'm grateful to them not only for the data, but for the opportunity to learn about using proxies to circumvent CORS errors. Cheers!

# Using the Proxy
The *index.js* file can be modified to add routes or replace the one that's already in there. The FXdata API opens up a few endpoints, which I've proxied through an "/exchange" endpoint. So where the FXdata URL path starts with **/api/**, this one starts with **/exchange/**. Everything after that is the same.

## Validation
I've thrown in some validation to prevent bad actors from using this tool to send SQL injection attacks to FXdata. Standard "good citizen" practice.

Here are the fields that will properly validate in the query string:

- currency
- yearly_average
- date_min
- date_max
- page (paginated requests are passed through, still need to be handled by the client)
