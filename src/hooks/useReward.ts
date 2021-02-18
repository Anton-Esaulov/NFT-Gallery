import { useCallback } from 'react'

import useNFTG from './useNFTG'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../NFTG/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const NFTG = useNFTG()
  const masterChefContract = getMasterChefContract(NFTG)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, NFTG])

  return { onReward: handleReward }
}

export default useReward
