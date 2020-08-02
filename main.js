const {blockchain,transaction}=require('./blockchain');
const {bblockchain,btransaction}=require('./bufferblkchain');
const EC= require('elliptic').ec;
const ec = new EC('secp256k1');

const mykey= ec.keyFromPrivate('e18f5cc76d46a929d17fbbef9f1871dbbb3a2d392f10b48efd9566cedd4dd908');
const mywalletadd=mykey.getPublic('hex');
const mykey1= ec.keyFromPrivate('e1fccbc30aa1373ab48ec028b6bd2b4dc0c84f016a2f53231db0e8f52ca5aad0');
const mywalletadd1=mykey1.getPublic('hex');

//----initialize and add first transaction to bufferchain------
let bufchain= new bblockchain();
const tx2= new btransaction(mywalletadd,mywalletadd1,10,'hwcoin','hwcoin1');
tx2.signtx(mykey);
bufchain.addtransaction(tx2);
// bufchain.minependingtansactions();


//-------add balance----------
let hwcoin = new blockchain();
const tx0= new transaction('system',mywalletadd,100,null,'hwcoin','hwcoin','null');
tx0.signtx(mykey);
hwcoin.addtransaction(tx0); 
hwcoin.minependingtansactions('rewardaddr');
console.log("balance of address is "+ hwcoin.getbalanceofadd(mywalletadd));
console.log();


//----recieve details to input into other two chains----
console.log("starting the miner");
let hashofblock=bufchain.minependingtansactions();
console.log("pending transactions mined");
let toc=bufchain.gettransdet(mywalletadd,mywalletadd1).toc;
console.log("chain name of to chain recieved");
let fromc=bufchain.gettransdet(mywalletadd,mywalletadd1).fromc;
console.log("chain name of from chain recieved");
let tadd=bufchain.gettransdet(mywalletadd,mywalletadd1).tadd;
console.log("transaction details of to chain recieved");
let fadd=bufchain.gettransdet(mywalletadd,mywalletadd1).fadd;
console.log("transaction details of from chain recieved");
let amt=bufchain.gettransdet(mywalletadd,mywalletadd1).amount;
console.log("transaction amount of from chain recieved");
let camt=bufchain.gettransdet(mywalletadd,mywalletadd1).convertedamount;
console.log("transaction details of to chain recieved");

console.log(hashofblock);
console.log(toc);
console.log(fromc);
console.log(tadd);
console.log(fadd);
console.log(amt);
console.log(camt);
console.log();


//----add transation to first chain---------
//let hwcoin = new blockchain();
const tx1= new transaction(fadd,tadd,amt,fromc,toc,'hwcoin',hashofblock);
tx1.signtx(mykey);
hwcoin.addtransaction(tx1); 
hwcoin.minependingtansactions('rewardaddr');
console.log("balance of address is "+ hwcoin.getbalanceofadd(fadd));
console.log();



//----------add transaction to second chain-----------
let hwcoin1 = new blockchain();
const tx3= new transaction(fadd,tadd,camt,fromc,toc,'hwcoin1',hashofblock);
tx3.signtx(mykey);
hwcoin1.addtransaction(tx3); 
hwcoin1.minependingtansactions('rewardaddr');
console.log("balance of address is "+ hwcoin1.getbalanceofadd(tadd));
console.log();



//--------check chain validation------
console.log("is chain valid " + hwcoin.isblockchainvalid());
console.log("is chain valid " + hwcoin1.isblockchainvalid());





//---- view chain in console--------
console.log(JSON.stringify(hwcoin, null, 4));
console.log('___________________________________________________________________________________________________________')
console.log('___________________________________________________________________________________________________________')
console.log('___________________________________________________________________________________________________________')
console.log(JSON.stringify(hwcoin1, null, 4));
console.log('___________________________________________________________________________________________________________')
console.log('___________________________________________________________________________________________________________')
console.log('___________________________________________________________________________________________________________')
console.log(JSON.stringify(bufchain, null, 4));

console.log("is chain valid " + bufchain.isblockchainvalid());
