const { ethers } = require("hardhat");

 async function main(){
    const greeterAddress ="0x230a2AA3FdE3952f214F4Dcb3CEb2DeA94a51781";
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = Greeter.attach(greeterAddress);
    //const greeting = await greeter.greet();
    //console.log(greeting);
    const tx = await greeter.setGreeting("Adios mundo cruel");
    await tx.await();

}

main()