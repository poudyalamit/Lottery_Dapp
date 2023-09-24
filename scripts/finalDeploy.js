const hre= require("hardhat");

async function main() {
  const Lottery = await hre.ethers.deployContract('Lottery');
  await Lottery.waitForDeployment();
  console.log("Address of contract:", await Lottery.getAddress());
}

main().catch((error)=>{
  console.error(error);
  process.exitCode=1;
})