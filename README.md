# hwcoin


Created a basic blockchain using youtube video: https://www.youtube.com/watch?v=zVqczFZr124 for reference.

<h2>Features</h2>
<p>
1)Tried to implement cross chan transactions across two different instances of the blockchain (mimicing 2 different blockchains)
2)Made necessay changes into the signing methods and getbalance methods.
3)Made a buffer chain to keep record of all transactions which then can be used to push the transactions onto the recieving and sending chain. </p>
<h4>Limitations and bugs</h4>
<p>1)Need to correct false transactions bieng created into senders chain with the receviers chain address.(need to change getbalance method)
2)need to implement checking methods which can make sure the chains are in sync with the bufferchain and in future versions also directly pull the incoming transactions from the bufferchain which allows self correction
3)right now one has to send 3 resquests to 3 different chains to ensure the system works which needs to be changed to only one push to the bufferchain and the recieveing and sending chains should pull the transactions automatically</p>
