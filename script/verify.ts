import console from "console"
const hre = require("hardhat")

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000" 

async function main() {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const SignerVerification = (await deployments.get('SignerVerification')).address;
  const TestNFT = (await deployments.get('TestNFT')).address;

  const chainLinkConfig = {
    vrfCoordinator: '0x6A2AAd07396B36Fe02a22b33cf443582f682c82f',
    linkToken: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
    keyHash: '0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314',
    subscriptionId: 1650,
    callbackGasLimit: 300000,
    requestConfirmations: 3
  };
  
  await hre.run("verify:verify", {
    address: TestNFT,
    constructorArguments: [
      chainLinkConfig,
      0,
      0,
      1661264828,
      1661264828,
      deployer
    ],
    libraries: {
      "SignerVerification": SignerVerification
    }
  });

  console.log('\n----Done---------');

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })