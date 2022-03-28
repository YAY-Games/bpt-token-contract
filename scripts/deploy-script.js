const BoldPointToken = artifacts.require("BoldPointToken");

async function main() {
  const token = await BoldPointToken.new();
  BoldPointToken.setAsDeployed(token);

  console.log("BoldPointToken deployed: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });