export const getSaleNFTsScript = `
import RarityNFT from 0x856e58a2c9a2f406
import NonFungibleToken from 0x631e88ae7f1d7c20
import RarityNFTMarketplace from 0x856e58a2c9a2f406

pub fun main(account: Address): {UInt64: RarityNFTMarketplace.SaleItem} {
  let saleCollection = getAccount(account).getCapability(/public/RarityNFTSaleCollection)
                        .borrow<&RarityNFTMarketplace.SaleCollection{RarityNFTMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

  let collection = getAccount(account).getCapability(/public/RarityNFTCollection) 
                    .borrow<&RarityNFT.Collection{NonFungibleToken.CollectionPublic, RarityNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let saleIDs = saleCollection.getIDs()

  let returnVals: {UInt64: RarityNFTMarketplace.SaleItem} = {}

  for saleID in saleIDs {
    let price = saleCollection.getPrice(id: saleID)
    let nftRef = collection.borrowEntireNFT(id: saleID)

    returnVals.insert(key: nftRef.id, RarityNFTMarketplace.SaleItem(_price: price, _nftRef: nftRef))
  }

  return returnVals
}
`