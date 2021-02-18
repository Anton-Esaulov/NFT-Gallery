import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../nftg/utils'
import useNFTG from './useNFTG'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const NFTG = useNFTG()
  const farms = getFarms(NFTG)
  const masterChefContract = getMasterChefContract(NFTG)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, NFTG])

  useEffect(() => {
    if (account && masterChefContract && NFTG) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, NFTG])

  return balances
}

export default useAllEarnings
