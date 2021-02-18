import { useCallback } from 'react'

import useNFTG from './useNFTG'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../nftg/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const NFTG = useNFTG()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(NFTG),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, NFTG],
  )

  return { onStake: handleStake }
}

export default useStake
