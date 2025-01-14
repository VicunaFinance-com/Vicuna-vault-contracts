const hardhat = require("hardhat");

export async function verify(address, constructorArguments) {
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