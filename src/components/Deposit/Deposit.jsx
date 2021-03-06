import { ArrowCircleDownIcon, ChevronDownIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { USDCAddress, USDCABI } from '../../contracts/USDCContract'
import { MiraAddress, MiraABI } from '../../contracts/MiraContract'
import { useMoralis,useMoralisWeb3Api } from 'react-moralis'
import {useState,useEffect} from 'react'
export default function Deposit() {
  const { Moralis,user } = useMoralis()
  const Web3Api = useMoralisWeb3Api();
  const [token,setToken] = useState()
  const [uSDC,setUSDC]  = useState()
  useEffect(()=>{
    
    async function fetchTokenBalances(){
      const options = {
        chain: "mumbai",
    
      };
      const balances = await Web3Api.account.getTokenBalances(options);
      const web3Provider = await Moralis.enableWeb3()
      const ethers = Moralis.web3Library
      
     balances.forEach(token => {
       //  console.log(token.token_address.localeCompare( MiraAddress.toLowerCase()))
         
       if(token.token_address == "0x9aa7fEc87CA69695Dd1f879567CcF49F3ba417E2".toLowerCase())
         setUSDC(ethers.utils.formatUnits(token.balance,token.decimals));
        
     })

    };

    fetchTokenBalances()

  },[token])
  async function contractCall() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractUSDC = new ethers.Contract(
      USDCAddress,
      USDCABI,
      web3Provider.getSigner()
    )

    const contract = new ethers.Contract(
      MiraAddress,
      MiraABI,
      web3Provider.getSigner()
    )

    const depositAmount = ethers.utils.parseUnits(
      document.getElementById('depositAmount').value,6
    )

   let tx = await contractUSDC.approve(MiraAddress, depositAmount)
   await tx.wait();

   //alert(depositAmount)
    let tx2 = await contract.deposit('0', depositAmount)  
    alert('deposit successfull!')

    setToken(new Date())
  
  }

  return (
    <div className="m-2 flex w-4/12 flex-col justify-between rounded-xl bg-[#171717] p-8 px-16 text-base font-bold text-white shadow-lg lg:w-4/12">
      <button onClick = {()=> contractCall()} className="mb-4 flex w-3/12 flex-row items-center justify-between rounded-full border-2 border-white bg-transparent p-1 px-4 text-sm">
        Deposit
      </button>
      <div className="flex h-16 w-full flex-row items-center justify-between">
        <input
          type="number"
          name="depositAmount"
          id="depositAmount"
          className="bg-transparent"
          placeholder="amount"
        />
        <div className="flex items-center space-x-2">
          <Image src={'/usdc-logo.png'} height={25} width={25} />
          <p className="text-sm font-semibold">USDC</p>
        </div>
      </div>
      <p className="-mt-2 text-xs font-light text-gray-300">
        Balance: {uSDC}
      </p>
      <div className="flex w-full flex-row items-end justify-end">
        <ArrowCircleDownIcon className="h-7" />
      </div>
      <p className="mt-2 text-xs font-light text-gray-300">To Impact Fund</p>
      <div className="flex h-16 w-full flex-row items-center justify-between">
        <p className="-mt-2 text-2xl font-bold">Climate Regeneration</p>
        <div className="flex items-center space-x-2">
          <Image src={'/mira-prp.png'} height={25} width={25} />

          <p className="text-sm font-semibold">REFI</p>
        </div>
      </div>
      <p className="-mt-2 text-xs font-extralight text-gray-300 underline">
        See inside this fund
      </p>
      <div className="mt-12 flex w-full flex-row items-center justify-evenly">
        <div className="w-9/12 cursor-pointer rounded-full  bg-gradient-to-r from-[#5653E2] via-[#D77968] to-[#D86972] p-1.5 px-2 text-sm font-medium tracking-wide text-white">
          <div className="m-1 flex flex-row items-center justify-center space-x-2 text-xs">
            <button onClick={contractCall}>Deposit</button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full flex-row items-center justify-between text-xs font-light text-gray-300">
        <p>Fees paid to fund</p>
        <p>10.00%</p>
      </div>
      <p className="mt-4 flex flex-row items-center justify-between text-xs font-light text-gray-300">
        <p>Estimated Network Fees</p>
        <p>0.01 MATIC</p>
      </p>
    </div>
  )
}
