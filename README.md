# DecentraList -- A Solidity, Ganache, Remix, React, useDApp, Chakra-ui Starter dApp

This is an introductory project that demonstrates various fundamentals of Web3 and SmartContract development.

## Setup Contract

Follow the below steps to set up the project

### [Ganache](https://github.com/trufflesuite/ganache)

Start by installing Ganache

> Ganache is an Ethereum simulator that makes developing Ethereum applications faster, easier, and safer.

- `brew install --cask ganache`
- Open the Ganache application
- Create a new server

### [Truffle](https://trufflesuite.com/)

Install the TruffleSuite

- `npm install -g truffle@latest`

### Install Smart Contract Dependencies

Change directories to the `blockchain` folder and install the node dependencies

- `cd blockchain`
- `npm install`

### Compile The TodoList contract

While in the `blockchain` directory run the following to compile the contract

`truffle compile`

You should see something similar to this:

```
❯ truffle compile

Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/TodoList.sol
> Artifacts written to /Users/markjtaylorroberts/Documents/Projects/eth-todo-list/blockchain/build/contracts
> Compiled successfully using:
   - solc: 0.8.13+commit.abaa5c0e.Emscripten.clang
```

### Deploy The TodoList contract to Ganache

Deploy the compiled TodoList contract to Ganache by running the migrate command

- `truffle migrate`

If you want to deploy again after making changes, you can bypass creating a new "migration" file by running

- `truffle migrate --reset`

### Interact With Your Contract

Open a truffle console to test your Contracts functions

- `truffle console`

While in the console, create an instance of your contract

`truffle(development)> todoList = await TodoList.deployed()`

Inspect the contracts address

`truffle(development)> todoList.address`

Create a Todo item

`truffle(development)> todoList.createTask("My task")`

Get a list of your Todo items

```
truffle(development)> todoList.getOwnerTasks()
[
  [
    '0',
    'My task',
    false,
    id: '0',
    content: 'My task',
    completed: false
  ]
]
```

## Setup Web3 dApp

This project comes equipped with a Web3 dApp built in react.

The project uses Chakra-ui for Components and Styles and the useDApp library for interacting with our Contract.

Start by changing directory to the `app` folder.

`cd app`

### Install Dependencies

`npm install`

### Start the web server

`npm start`

## Setup MetaMask

In order to interact with our Contract from our WebApp, we'll need to add the Ganache network to MetaMask and import one of our Ganache accounts using the provided private key.

### Add Ganache to MetaMask

1. Open MetaMask and add a network with the following properties
   - Name: `Ganache`
   - New RPC Url: `http://127.0.0.1:7545
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
2. Click Save

### Import Ganache Account

With the Ganache network added to MetaMask, we can now add one of our Ganache test accounts.

1. Open the Ganache App (GUI)
2. If "Accounts" isn't already active, click "Accounts".
3. Next to one of your listed Ganache accounts, click the Key icon on the far right.
4. Copy the selected accounts private key
5. Open MetaMask
6. Click the circular Identicon in the top-right corner of MetaMask
7. Select "Import Account"
8. Paste your Ganache account's private key and click "import"

### Connect your test account to our dApp

With the web UI running, head over to `http://localhost:3000`.

- Open MetaMask, switch to your test account, and change to your Ganache network.
- In the Todo UI, click "Connect To Wallet"
- Select your test account to connect with

After connecting MetaMask you should now see ~100ETH and a sub-string of your Address!

# Remix GUI

You can optionally edit and deploy your contract via Remix

`npm install -g @remix-project/remixd`
