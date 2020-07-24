const EC= require('elliptic').ec;
const ec = new EC('secp256k1');

const key=ec.genKeyPair();
const Publickey= key.getPublic('hex');
const Privatekey = key.getPrivate('hex');
const key1=ec.genKeyPair();
const Publickey1= key1.getPublic('hex');
const Privatekey1 = key1.getPrivate('hex');

console.log()
console.log("public key is " + Publickey)
console.log()
console.log("private key is " + Privatekey)
console.log()
console.log("public key is " + Publickey1)
console.log()
console.log("private key is " + Privatekey1)