# Crypto-coin


Created a basic blockchain using youtube video: https://www.youtube.com/watch?v=zVqczFZr124 for reference.
Added cross chain transaction partial support

<h2>Features</h2>
<p>
1) Tried to implement cross chan transactions across two different instances of the blockchain (mimicking 2 different blockchains)
  
2) Made necessary changes into the signing methods and getbalance methods.

3) Made a buffer chain to keep record of all transactions which then can be used to push the transactions onto the recieving and sending chain. </p>


<h4>Corrections , limitations and bugs</h4>
<hr>
<p>
1) Corrections for false transactions being created into senders chain with the receviers chain address. (need to change getbalance method)
  
2) Pending implementation for checking methods which can make sure the chains are in sync with the bufferchain and in future versions also directly pull the incoming transactions from thebufferchain which allows self correction.
  
3) Currently 3 requests to 3 different chains are needed to be sent to ensure the system works which needs to be changed to only one push to the bufferchain and the    receiving and sending chains should pull the transactions automatically</p>
