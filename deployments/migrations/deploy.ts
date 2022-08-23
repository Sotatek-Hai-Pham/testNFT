import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment,
): Promise<void> {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log('deployer: ', deployer);

  const chainLinkConfig = {
    vrfCoordinator: '0x6A2AAd07396B36Fe02a22b33cf443582f682c82f',
    linkToken: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
    keyHash: '0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314',
    subscriptionId: 1650,
    callbackGasLimit: 300000,
    requestConfirmations: 3
  };

  const libAddress = (await deploy("SignerVerification", {
    from: deployer,
    log: true,
  })).address;


  await deploy('TestNFT', {
    from: deployer,
    log: true,
    args: [
      chainLinkConfig,
      0,
      0,
      1661264828,
      1661264828,
      deployer
    ],

    libraries: {
      "SignerVerification": libAddress
    }
  });

};


func.tags = ['FIRST'];
export default func;
