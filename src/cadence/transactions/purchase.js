export const purchaseTx = `
import RarityNFT from 0x856e58a2c9a2f406
import NonFungibleToken from 0x631e88ae7f1d7c20
import RarityNFTMarketplace from 0x856e58a2c9a2f406
import FlowToken from 0x7e60df042a9c0868

transaction(account: Address, id: UInt64) {

  prepare(acct: AuthAccount) {
    let saleCollection = getAccount(account).getCapability(/public/RarityNFTSaleCollection)
                        .borrow<&RarityNFTMarketplace.SaleCollection{RarityNFTMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

    let recipientCollection = getAccount(acct.address).getCapability(/public/RarityNFTCollection) 
                    .borrow<&RarityNFT.Collection{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

    let price = saleCollection.getPrice(id: id)

    let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault

    saleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment)
  }

  execute {
    log("A user purchased an NFT")
  }
}

`