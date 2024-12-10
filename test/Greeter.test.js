const { expect } = require("chai"); // Corrección del import
const { ethers } = require("hardhat");

describe("Greeter", function () {
    let Greeter;
    let greeter;

    beforeEach(async function () {
        Greeter = await ethers.getContractFactory("Greeter");
        greeter = await Greeter.deploy("Hola"); // Saludo inicial con mayúscula
    });

    it("debería inicializarse con el saludo 'Hola'", async function () {
        const greeting = await greeter.greet();
        expect(greeting).to.equal("Hola"); // Comparación con capitalización correcta
    });

    it("debería cambiar el saludo y leerlo correctamente", async function () {
        await greeter.setGreeting("Hola Mundo"); // Llave que faltaba para abrir el bloque
        const newGreeting = await greeter.greet();
        expect(newGreeting).to.equal("Hola Mundo"); // Comparación con el saludo esperado
    });
});
