export const mintNFT = `
import RarityNFT from 0x856e58a2c9a2f406

transaction(ipfsHash: String, name: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&RarityNFT.Collection>(from: /storage/RarityNFTCollection)
                        ?? panic("This collection does not exist here")

    let nft <- RarityNFT.createToken(ipfsHash: ipfsHash, metadata: {"name": name})

    collection.deposit(token: <- nft)
  }

  execute {
    log("A user minted an NFT into their account")
  }
}
`