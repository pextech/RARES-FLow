export const unlistFromSaleTx = `
import RarityNFTMarketplace from 0x40582f87fa3d66cb

transaction(id: UInt64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&RarityNFTMarketplace.SaleCollection>(from: /storage/RarityNFTSaleCollection)
                            ?? panic("This SaleCollection does not exist")

    saleCollection.unlistFromSale(id: id)
  }

  execute {
    log("A user unlisted an NFT for Sale")
  }
}

`