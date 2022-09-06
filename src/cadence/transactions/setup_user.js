export const setupUserTx = `
import RarityNFT from 0x856e58a2c9a2f406
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import RarityNFTMarketplace from 0x856e58a2c9a2f406

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- RarityNFT.createEmptyCollection(), to: /storage/RarityNFTCollection)
    acct.link<&RarityNFT.Collection{RarityNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/RarityNFTCollection, target: /storage/RarityNFTCollection)
    acct.link<&RarityNFT.Collection>(/private/RarityNFTCollection, target: /storage/RarityNFTCollection)
    
    let RarityNFTCollection = acct.getCapability<&RarityNFT.Collection>(/private/RarityNFTCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    acct.save(<- RarityNFTMarketplace.createSaleCollection(RarityNFTCollection: RarityNFTCollection, FlowTokenVault: FlowTokenVault), to: /storage/RarityNFTSaleCollection)
    acct.link<&RarityNFTMarketplace.SaleCollection{RarityNFTMarketplace.SaleCollectionPublic}>(/public/RarityNFTSaleCollection, target: /storage/RarityNFTSaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}

`