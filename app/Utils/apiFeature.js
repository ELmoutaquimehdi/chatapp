import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI } from "../Context/constants";

// Vérifier si le portefeuille est connecté
export const CheckIfWalletConnected = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install MetaMask");
            return;
        }
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) {
            console.log("No wallet connected");
        } else {
            const firstAccount = accounts[0];
            console.log(`Connected account: ${firstAccount}`);
            return firstAccount;
        }
    } catch (error) {
        console.error("Error checking wallet connection:", error);
    }
};


// Connecter le portefeuille
export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install MetaMask");
            return;
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        console.log(`Wallet connected: ${firstAccount}`);
        return firstAccount;
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
};

// Récupérer le contrat
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

// Connexion au contrat
export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = await ethers.BrowserProvider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        console.log("Connected to contract:", contract.address);
        return contract;
    } catch (error) {
        console.error("Error connecting with contract:", error);
    }
};

// Convertir le temps
export const convertTime = (time) => {
    const newTime = new Date(time.toNumber() * 1000); // Convert to milliseconds
    const realTime =
        newTime.getHours() +
        "/" +
        newTime.getMinutes() +
        "/" +
        newTime.getSeconds() +
        "/" +
        newTime.getDate() +
        "/" +
        (newTime.getMonth() + 1) +
        "/" +
        newTime.getFullYear();
    return realTime;
};
