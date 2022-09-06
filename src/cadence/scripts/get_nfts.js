export const getNFTsScript = `
import RarityNFT from 0x856e58a2c9a2f406
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&RarityNFT.NFT] {
  let collection = getAccount(account).getCapability(/public/RarityNFTCollection)
                    .borrow<&RarityNFT.Collection{NonFungibleToken.CollectionPublic, RarityNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let returnVals: [&RarityNFT.NFT] = []

  let ids = collection.getIDs()
  for id in ids {
    returnVals.append(collection.borrowEntireNFT(id: id))
  }

  return returnVals
}
`