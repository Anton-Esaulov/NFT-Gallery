import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../NFTG/utils'
import useNFTG from './useNFTG'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const NFTG = useNFTG()
  const masterChefContract = getMasterChefContract(NFTG)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, NFTG])

  useEffect(() => {
    if (account && NFTG) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, NFTG])

  return balance
}

export default useStakedBalance
