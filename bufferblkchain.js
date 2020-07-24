const SHA256 = require('crypto-js/sha256');
const EC= require('elliptic').ec;
const ec = new EC('secp256k1');


class btransaction{
    //-------create transaction constructor-----
    constructor(fromadd,toadd,amount,fromchain,tochain){
        this.conversionfactor=2;
        this.fromadd=fromadd;
        this.toadd=toadd;
        this.amount=amount;
        this.fromchain=fromchain;
        this.tochain=tochain;
        
    }
    calculatehash(){
        return SHA256(this.fromadd+ this.toadd + this.amount + this.fromchain + this.tochain).toString();
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
    

class bblockchain {
    constructor() {
        this.chain = [this.createGenesisblock()];
        this.difficulty=2;
        this.pendingtansactions=[]; 
       // this.miningreward=100;
        

    }
    createGenesisblock() {
        return new block( "05/06/2019", "genesisblock", "0000");
    }

    getlatestblock() {
       return this.chain[this.chain.length - 1];
    }
    minependingtansactions(){
        
        let Block = new block(Date.now(),this.pendingtansactions,this.getlatestblock().hash);
        Block.mineblock(this.difficulty);
       // console.log("blockmined");
       // console.log(miningrewardadd);
        this.chain.push(Block);
        return (Block.hash);
        //this.pendingtansactions=[new transaction(null,miningrewardadd,this.miningreward)];
        
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
    gettransdet(getftransaddr,gettotransaddr){
        var dict={
             amount:0,
             convertedamount:0,
         toc:"",
         fromc:"",
         tadd:"",
         fadd:""
        
        };
        for( const block of this.chain){
            for(const trans of block.transaction)
            {
                if(trans.fromadd==getftransaddr&& trans.toadd==gettotransaddr)
                {
                  dict.amount=trans.amount;
                  dict.convertedamount =trans.conversionfactor*trans.amount;
                  dict.tadd=trans.toadd;
                  dict.fadd=trans.fromadd;
                  dict.toc=trans.tochain;
                  dict.fromc=trans.fromchain;
                }
               
            }
        }
        return dict;
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
 
module.exports.bblockchain=bblockchain;
module.exports.btransaction=btransaction;