const SHA256 = require('crypto-js/sha256');
const EC= require('elliptic').ec;
const ec = new EC('secp256k1');

class transaction{
    constructor(fromadd,toadd,amount){
        this.fromadd=fromadd;
        this.toadd=toadd;
        this.amount=amount;
        // this.objid=objid;
        //this.nextid=nextid;
        //this.ownerid=ownerid;
        //also need to add nexthast instead of previous in the block
    }
    calculatehash(){
        return SHA256(this.fromadd+ this.toadd + this.amount).toString();
    }
    signtx(signkey){
        if(signkey.getPublic('hex') !== this.fromadd){
            throw new Error('you cannot sign for other wallets');
            
        } 

        const hashtx=this.calculatehash();
        const sig= signkey.sign(hashtx,'base64');
        this.signature=sig.toDER('hex');

    }
    isvalid(){
        if (this.fromadd == null) return true;

        if (!this.signature || this.signature.length=== 0)
        {
            throw new Error("no signature in this transaction");


        }

        const publickey=ec.keyFromPublic(this.fromadd,'hex');
        return publickey.verify(this.calculatehash(),this.signature);    


    }

}

class block {
    constructor( timestamp, transaction, previoushash = ''/* nexthash =''*/) {

        //this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previoushash = previoushash;
        this.hash = this.calculatehash();
        this.nonce=0;

    }
    calculatehash() {
        return SHA256( this.previoushash + this.timestamp+ this.nonce + JSON.stringify(this.transaction)).toString();
    } 
    mineblock(difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
           this.nonce++;
            this.hash=this.calculatehash();

        }
        console.log("block mined and hash is " + this.hash  );
    }
    hasvalidtx(){
        for(const tx of this.transaction){
            if(!tx.isvalid())
            return false;
        }
        return true;
    }
}
    

class blockchain {
    constructor() {
        this.chain = [this.createGenesisblock()];
        this.difficulty=2;
        this.pendingtansactions=[]; 
        this.miningreward=100;

    }
    createGenesisblock() {
        return new block( "05/06/2019", "genesisblock", "0000");
    }

    getlatestblock() {
       return this.chain[this.chain.length - 1];
    }
    minependingtansactions(miningrewardadd){
        
        let Block = new block(Date.now(),this.pendingtansactions,this.getlatestblock().hash);
        Block.mineblock(this.difficulty);
        console.log("blockmined");
        this.chain.push(Block);
        this.pendingtansactions=[new transaction(null,miningrewardadd,this.miningreward)];
        
    }
    addtransaction(transaction){
        if (!transaction.fromadd||! transaction.toadd){
            throw new Error('transaction must include to and from address')
        }
        if(!transaction.isvalid()){
            throw new Error("cannot add invalid transaction to the array")
        }
        this.pendingtansactions.push(transaction);

    }
    getbalanceofadd(getbaladdr){
        let balance=0;
        for( const block of this.chain){
            for(const trans of block.transaction)
            {
                if(trans.fromadd==getbaladdr)
                {
                  balance -= trans.amount;
                }
                if(trans.toadd==getbaladdr)
                {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    // addnewblock(newblock) {
    //     newblock.previoushash = this.getlatestblock().hash;
    //  //   newblock.hash = newblock.calculatehash();
    //     newblock.mineblock(this.difficulty);
    //     this.chain.push(newblock);

    // }
    isblockchainvalid(){
        for(let i=1;i<this.chain.length;i++)
            {
                const currentblock=this.chain[i];
                const prevblock=this.chain[i-1];
                if(!currentblock.hasvalidtx()){
                    return false;
                }
                if(currentblock.hash !==currentblock.calculatehash())
                {
                    return true;
                }
                if(currentblock.previoushash !==prevblock.hash)
                {
                    return false;
                }
                
             }
             return true;
    }
}
 
module.exports.blockchain=blockchain;
module.exports.transaction=transaction;