document.addEventListener("DOMContentLoaded", async () => {
    const connectButton = document.getElementById("connect-button");
    const accountStatus = document.getElementById("account-status");
    const greetingElement = document.getElementById("greeting");
    const statusElement = document.getElementById("status");
    const form = document.getElementById("change-greeting-form");
  
    const contractAddress = "0x230a2AA3FdE3952f214F4Dcb3CEb2DeA94a51781";
    const contractABI = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "greet",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
            }
          ],
          "name": "setGreeting",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
  
    let provider, signer, greeterContract;
  
    // Conectar MetaMask
    connectButton.addEventListener("click", async () => {
      if (!window.ethereum) {
        accountStatus.textContent = "MetaMask no está instalado.";
        return;
      }
  
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        const account = await signer.getAddress();
  
        accountStatus.textContent = `Conectado: ${account}`;
        connectButton.style.display = "none"; // Ocultar botón después de conectar
        form.style.display = "block"; // Mostrar formulario
  
        // Inicializar el contrato
        greeterContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        // Obtener saludo actual
        const currentGreeting = await greeterContract.greet();
        greetingElement.textContent = currentGreeting;
      } catch (error) {
        console.error("Error al conectar MetaMask:", error);
        accountStatus.textContent = "Error al conectar MetaMask.";
      }
    });
  
    // Manejar el cambio de saludo
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const newGreeting = document.getElementById("new-greeting").value;
  
      try {
        const tx = await greeterContract.setGreeting(newGreeting);
        statusElement.textContent = "Transacción enviada. Esperando confirmación...";
        await tx.wait();
        statusElement.textContent = "Saludo cambiado exitosamente.";
        greetingElement.textContent = newGreeting;
      } catch (error) {
        console.error("Error al cambiar el saludo:", error);
        statusElement.textContent = "Error al cambiar el saludo.";
      }
    });
  });
  