const GuruToken = artifacts.require('GuruToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {

	//Deploy Mock Dai Token
	await deployer.deploy(DaiToken)
	const daiToken = await DaiToken.deployed()

	//Deploy Mock Guru Token
	await deployer.deploy(GuruToken)
	const guruToken = await GuruToken.deployed()
	
	//Deploy TokenFarm
	await deployer.deploy(TokenFarm, guruToken.address, daiToken.address)
	const tokenFarm = await TokenFarm.deployed()
	
 	// Transfer all tokens to TokenFarm (1 million)
 	await guruToken.transfer(tokenFarm.address, '1000000000000000000000000')

  	// Transfer 100 Mock DAI tokens to investor
  	await daiToken.transfer(accounts[1], '100000000000000000000')
};
