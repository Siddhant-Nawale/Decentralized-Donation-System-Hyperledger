
'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const registerUser = async (u,ut) => {
    const usertype = ut;
    console.log(usertype);

    let org = '1';

    if (usertype === 'Donar') {
        org = '1';
    } else if (usertype === 'Charity') {
        org = '2';
    } else if (usertype === 'Portal') {
        org = '3';
    }
    try {

        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org' + org + '.example.com', 'connection-org' + org + '.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const caURL = ccp.certificateAuthorities['ca.org' + org + '.example.com'].url;
        const walletPath = path.join(process.cwd(), 'wallet' + org);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        console.log(u)
        var ca;
        const userIdentity = await wallet.get('sid');
        console.log(userIdentity)
        if (userIdentity) {
            console.log('An identity for the user' + u + 'already exists in the wallet');
            return;
        }
        else{
            ca = new FabricCAServices(caURL);
        }
       const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');
        const secret = await ca.register({
            affiliation: 'org' + org + '.department1',
            enrollmentID: u,
            role: 'client',
            maxEnrollments :-1
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: u,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org' + org + 'MSP',
            type: 'X.509',
        };
        await wallet.put(u, x509Identity);
        console.log('Successfully registered and enrolled admin user ' + u + '" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "appUser": ${error}`);
        process.exit(1);
    }
}


module.exports = registerUser;
