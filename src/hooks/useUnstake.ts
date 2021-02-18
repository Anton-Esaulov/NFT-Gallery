import { useCallback } from 'react'

import useNFTG from './useNFTG'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../NFTG/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const NFTG = useNFTG()
  const masterChefContract = getMasterChefContract(NFTG)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, NFTG],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
