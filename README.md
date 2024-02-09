## Installation

```bash
npm install
```

## Set up the environment
Create an `.env` file and add these environment variables:
```
REACT_APP_SOCKET_SERVER_URL="ws://[netloc][:port]"
REACT_APP_REST_API_SERVER_URL="http://[netloc][:port]"
REACT_APP_ADDRESS_TYPE="raspadev"
REACT_APP_COIN_NAME="RAS"
```
>**Note:** If there is no connection to the database, then pay attention to the prefixes `ws` and `http` that are said in the environment variables

## Run

```bash
npm run start
```