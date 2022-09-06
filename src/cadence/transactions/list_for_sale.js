export const listForSaleTx = `
import RarityNFTMarketplace from 0x856e58a2c9a2f406

transaction(id: UInt64, price: UFix64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&RarityNFTMarketplace.SaleCollection>(from: /storage/RarityNFTSaleCollection)
                            ?? panic("This SaleCollection does not exist")

    saleCollection.listForSale(id: id, price: price)
  }

  execute {
    log("A user listed an NFT for Sale")
  }
}
`