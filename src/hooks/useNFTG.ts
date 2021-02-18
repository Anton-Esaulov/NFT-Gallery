import { useContext } from 'react'
import { Context } from '../contexts/NftgProvider'

const useNFTG = () => {
  const { nftg } = useContext(Context)
  return nftg
}

export default useNFTG
