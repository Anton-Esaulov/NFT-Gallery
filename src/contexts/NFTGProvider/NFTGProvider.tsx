import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Nftg } from '../../nftg'

export interface NFTGContext {
  nftg?: typeof Nftg
}

export const Context = createContext<NFTGContext>({
  nftg: undefined,
})

declare global {
  interface Window {
    nftgsauce: any
  }
}

const NftgProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [nftg, setNftg] = useState<any>()

  // @ts-ignore
  window.Nftg = Nftg
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const nftgLib = new Nftg(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setNftg(nftgLib)
      window.nftgsauce = nftgLib
    }
  }, [ethereum])

  return <Context.Provider value={{ nftg }}>{children}</Context.Provider>
}

export default NftgProvider
