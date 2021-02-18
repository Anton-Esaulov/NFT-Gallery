import { useContext } from 'react'
import { Context } from '../contexts/NFTGProvider'

const useNFTG = () => {
  const { NFTG } = useContext(Context)
  return NFTG
}

export default useNFTG
