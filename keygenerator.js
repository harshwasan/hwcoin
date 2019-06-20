const EC= require('elliptic').ec;
const ec = new EC('secp256k1');

const key=ec.genKeyPair();
const Publickey= key.getPublic('hex');
const Privatekey = key.getPrivate('hex');

console.log()
console.log("public key is" + Publickey)
console.log()
console.log("private key is" + Privatekey)