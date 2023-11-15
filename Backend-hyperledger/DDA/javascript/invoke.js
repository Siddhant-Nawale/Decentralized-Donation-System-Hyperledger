

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { skip } = require('node:test');
const argv = yargs(hideBin(process.argv)).argv;
console.log(argv);




const invoke = async (func,productId,user,obj,usertype,channel,cc) => {
    let org = '1';

    if (usertype === 'Donor') {
        org = '1';
    } else if (usertype === 'Charity') {
        org = '2';
    }
    try {


        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org' + org + '.example.com', 'connection-org' + org + '.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet' + org);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log('Wallet path: '+walletPath, user);


        const identity = await wallet.get('siddhantnawale');
        if (!identity) {
            console.log('From invoke.js');
            console.log('An identity for the user ' + user + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }


        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });
        console.log("channel",channel)

        const network = await gateway.getNetwork(`${channel}`);

        const contract = network.getContract('Tsac');

        if (func === 'createTransaction') {
            await contract.submitTransaction(func, productId, JSON.stringify(obj));
            console.log('Transaction has been submitted');
        } else if (func === 'queryAllTransactions') {
            await contract.submitTransaction(func);
            console.log('Transaction has been submitted');
        } else if (func === 'queryTransaction') {
            await contract.submitTransaction(func, productId);
            console.log('Transaction has been submitted');
        } else {
            console.log('Invalid function');
        }


        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}


module.exports = invoke;
