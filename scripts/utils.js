const hardhat = require("hardhat");

const VERIFY_CONTRACT = false;

export async function verify(address, constructorArguments) {
  if (VERIFY_CONTRACT) {
    try {
      await hardhat.run("verify:verify", {
        address: address,
        constructorArguments: constructorArguments,
      });
    } catch (err) {
      if (err.message.includes("Reason: Already Verified")) {
        console.log("Contract is already verified!");
      } else {
          throw err;
      }
    }
  }
}