This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Purpose

Main objective of this project is to showcase the Next.js application with D3 chart component displaying Average Ethererum Transaction Fee.

## Vercel

Application is deployed to Vercel - [link](https://eth-avg-gas-price-chris.vercel.app/)

## Possible Problems

Owracle API is used to fetch the data - it requires usage of API Keys. Fortunately there are available free plans, but with one of such API Keys app got deployed. 
It might happen than free calls are used and consequitive requests gives 403 errors. In this situation I advide:
- wait some time
- obtain secondary API key and set the global variable in browser dev tools console `OWRACLE_API_KEY` with it:
```javascript
window.OWRACLE_API_KEY = "YOUR_API_KEY"
```