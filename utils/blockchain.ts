import { BrowserProvider, Contract } from "ethers";
import contractABI from "@/contracts/EHealthTransaction.json"; // Ensure this path is correct

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_YOUR_DEPLOYED_CONTRACT_ADDRESS || ""; // Replace with your contract's deployed address

export const getContract = async (): Promise<any> => {
  if (typeof (window as any).ethereum !== "undefined") {
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};
