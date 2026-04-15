# hwcoin

Early JavaScript learning project exploring basic blockchain data structures and cross-chain transaction synchronization ideas.

This repository was built during college as an experiment in how transactions, balances, signing, and chain-to-chain transfer coordination might work across multiple blockchain instances.

## What I Explored

- a simple blockchain implementation in JavaScript
- transaction signing and balance handling
- cross-chain style transfers between two separate chain instances
- a buffer chain used as an intermediate transaction record

## Project Goal

The main goal was to test whether a transfer could be represented across multiple blockchain-like instances while keeping a shared record of the movement in a separate buffer chain.

At a high level, the design was:

1. create transactions on one chain
2. record them in a buffer chain
3. propagate the transaction state to the sending and receiving chains

## What Was Implemented

- basic blockchain structures and transaction flow
- partial support for cross-chain style transaction handling
- changes to signing and balance logic to support multi-chain scenarios
- a buffer-chain concept for tracking transaction movement between chains

## Limitations

This was an exploratory project, not a production-ready system.

Known gaps at the time:

- false transactions could still appear on the sender chain under some conditions
- synchronization between the chains and the buffer chain was incomplete
- the transfer flow required multiple manual pushes instead of a cleaner pull-based propagation model

## What I Learned

- transaction correctness gets harder once state is split across multiple ledgers
- balance calculation and synchronization logic are tightly coupled
- intermediate event or journal layers can simplify reconciliation, but only if the consistency model is designed carefully

## Repository Status

I am keeping this repository as an early learning project. It does not represent my current production work or current engineering level.
