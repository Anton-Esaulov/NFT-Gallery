import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../nftg/utils'
import useNFTG from './useNFTG'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const NFTG = useNFTG()
  const masterChefContract = getMasterChefContract(NFTG)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, NFTG])

  useEffect(() => {
    if (account && masterChefContract && NFTG) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, NFTG])

  return balance
}

export default useEarnings
