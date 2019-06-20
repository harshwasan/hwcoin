const {blockchain,transaction}=require('./blockchain');
const EC= require('elliptic').ec;
const ec = new EC('secp256k1');

const mykey= ec.keyFromPrivate('3896381346e6d9583bf9c2ce0f8ad7f0d322bb2c80ed4a4e633e120726a3cf9a');
const mywalletadd=mykey.getPublic('hex');

let hwcoin = new blockchain();
const tx1= new transaction(mywalletadd,'pubickey',10);
tx1.signtx(mykey);
hwcoin.addtransaction(tx1);
// console.log("mining block...")
// hwcoin.addnewblock(new block(1, "06/06/2019", { amount: 10 }));
// console.log("mining block...")
// hwcoin.addnewblock(new block(2, "07/06/2019", { amount: 10 }));
// console.log("mining block...")
// hwcoin.addnewblock(new block(3, "08/06/2019", { amount: 10 }));
//console.log('is blockchain valid '+ hwcoin.isblockchainvalid());
//console.log(JSON.stringify(hwcoin, null, 4));
// hwcoin.createtransaction(new transaction('addr1','addr2',100));
// hwcoin.createtransaction(new transaction('addr2','addr1',50));
// hwcoin.createtransaction(new transaction('addr1','addr3',70));
// console.log("starting the miner");
// hwcoin.minependingtansactions(mywalletadd);
// console.log("balance of rewardaddress is "+ hwcoin.getbalanceofadd(mywalletadd));
// console.log("balance of addr1 is "+ hwcoin.getbalanceofadd('addr1'));
// console.log("balance of addr2 is "+ hwcoin.getbalanceofadd('addr2'));
// console.log("balance of addr3 is "+ hwcoin.getbalanceofadd('addr3'));
console.log("starting the miner");
hwcoin.minependingtansactions('rewardaddr');
console.log("balance of rewardaddress is "+ hwcoin.getbalanceofadd(mywalletadd));
console.log("is chain valid " + hwcoin.isblockchainvalid());
