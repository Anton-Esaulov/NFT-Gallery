import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useNFTG from '../../hooks/useNFTG'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../NFTG/utils'
import { getFarms } from '../../NFTG/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const NFTG = useNFTG()
  const { account } = useWallet()

  const farms = getFarms(NFTG)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
