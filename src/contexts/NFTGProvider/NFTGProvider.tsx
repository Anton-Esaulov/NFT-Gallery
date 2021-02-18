import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { NFTG } from '../../NFTG'

export interface NFTGContext {
  NFTG?: typeof NFTG
}

export const Context = createContext<NFTGContext>({
  NFTG: undefined,
})

declare global {
  interface Window {
    NFTGsauce: any
  }
}

const NFTGProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [NFTG, setNFTG] = useState<any>()

  // @ts-ignore
  window.NFTG = NFTG
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const NFTGLib = new NFTG(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setNFTG(NFTGLib)
      window.NFTGsauce = NFTGLib
    }
  }, [ethereum])

  return <Context.Provider value={{ NFTG }}>{children}</Context.Provider>
}

export default NFTGProvider
