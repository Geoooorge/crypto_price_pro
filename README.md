

# README

## Coin Gazer (Breakable Toy)
### Launch Academy, August 2017

Coin Gazer provides up-to-the-minute trade and price data for cryptocurrencies such as Bitcoin, Ethereum, and Litecoin. Users create and receive custom alerts when individual currencies/exchanges reach a user's specified price threshold.

![Coin Gazer Screenshot](./coingazer-vid.gif)

### Technology

1. The user interface is built in React.js.
2. API price updates are handled by Redis and Sidekiq. Alternatively, price updates can be run using a rake task:
`rake trades:all_pricing`
3. The user interface page incorporates the Chart.js library to display recent trade data.
4. User price notifications are sent by text and email using Twilio and Sendgrid.


### Setup
To set up this program on your system, first make sure the Redis is installed, then run:

```
bundle
rake db:create
rake db:migrate
rails s
```


In separate terminal tab, run the following:

```
yarn
yarn start
```

In a separate terminal tab start the Redis server by running the following:
```
redis-server
```

In another terminal window, run the following:
```
sidekiq ./app/workers/price_worker.rb
```

Navigate to `localhost:3000`. The site should show up after this.

Please refer to the `.env.example` file to see what API keys/etc. you will need to set up for this app.
