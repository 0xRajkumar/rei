import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
    defaultNetwork: 'mumbai',
    solidity: '0.8.9',
    networks: {
        hardhat: {
            chainId: 1337
        },
        mumbai: {
            url: process.env.MUMBAI_URL || '',
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : []
        }
    },
    etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY
    }
};

export default config;
