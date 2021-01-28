const { ethers } = require("hardhat");
const chalk = require('chalk');
const media_abi = require("../abis/media.json")
const fs = require("fs-extra");

async function main() {
  // const contract = await ethers.getContractFactory("ERC721");
  // const zora = await contract.attach('0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7')
  // const totalSupply = await zora.totalSupply()
  // console.log(totalSupply.toString())
  // const owner = await zora.ownerOf(97)
  // console.log(owner)
  // await zora.mint('0x2388C11d0532CE92A99d16D1980cc5980cF575C3')

  const interface = new ethers.utils.Interface(media_abi)
  console.log(Object.keys(interface.functions))
  const method = 'mint((string,string,bytes32,bytes32),((uint256),(uint256),(uint256)))'
  const decoded = interface.decodeFunctionData(
    method,
    '0x2cca323700000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d02ab486cedc00000000000000000000000000000000000000000000000000049b9ca9a6943400000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000010067b87773fc0cf6de46d2787dbf73bd9c93ef9d7ea249e235507195c8e9f61e86202914e0ff276fa31e989332aa32caf2493459ba5f630eefeac96d732764485d000000000000000000000000000000000000000000000000000000000000005668747470733a2f2f697066732e666c65656b2e636f2f697066732f62616679626569686d6e79747063376c71717668376c716c36787369633337737563347666637935687174373633743768726e727a77743670676500000000000000000000000000000000000000000000000000000000000000000000000000000000005668747470733a2f2f697066732e666c65656b2e636f2f697066732f6261666b726569626166656b6f62377a686e36727235676574676b7664667378736a653266746f73376d6d686f3732776a6e767a736f7a63696c7500000000000000000000'
  )
  console.log(chalk.green(decoded.data.tokenURI))
  console.log(chalk.green(decoded.data.metadataURI))
  console.log()
  console.log(chalk.green(decoded.data.contentHash))
  console.log(chalk.green(ethers.utils.sha256(ethers.utils.toUtf8Bytes('69'))))
  console.log()
  console.log(chalk.green(decoded.data.metadataHash))
  console.log(chalk.green(ethers.utils.sha256(ethers.utils.toUtf8Bytes(
    '{"description":"lol","mimeType":"text/plain","name":"69","version":"zora-20210101"}'
  ))))
  console.log(chalk.green(decoded.bidShares.toString()))

  const contract = await ethers.getContractAt(media_abi, '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7')
  const totalSupply = await contract.totalSupply()
  console.log(totalSupply.toString())
  // const file = fs.readFileSync('../bernie.png')

  const trx = await contract.mint(
    [
      'https://ipfs.io/ipfs/QmdC5VaiUbQc8jskS6oBm1AXzf1UTBRiHtDKWYetAxC1ZP',
      'https://ipfs.io/ipfs/QmPetrmCvD5th7AZjRxMz6diVa4wmtgfo85WTr5JEkR3xe',
      // ethers.utils.sha256(file),
      ethers.utils.sha256(ethers.utils.toUtf8Bytes('🖲️')),
      ethers.utils.sha256(ethers.utils.toUtf8Bytes('{"description":"🖲️","mimeType":"text/plain","name":"🖲️","version":"zora-20210101"}')),
    ],
    [
      ['0'], ['5000000000000000000'], ['95000000000000000000']
    ]
  )
  console.log(trx)
  // const trx = await contract.updateTokenMetadataURI(116, 'https://ipfs.io/ipfs/QmY8SPNxj8du2vvVprT4o6ZgMxHWHHv3y3xsFUDN4w7FYg')
  // const tokenURI = await contract.tokenURI(116)
  // console.log(tokenURI)
  // const tokenMetadataURI = await contract.tokenMetadataURI(116)
  // console.log(tokenMetadataURI)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

    //   /**
    //  * @notice see IMedia
    //  */
    // function mint(MediaData memory data, IMarket.BidShares memory bidShares)
    //     public
    //     override
    //     nonReentrant
    // {
    //     _mintForCreator(msg.sender, data, bidShares);
    // }

    // struct MediaData {
    //     // A valid URI of the content represented by this token
    //     string tokenURI;
    //     // A valid URI of the metadata associated with this token
    //     string metadataURI;
    //     // A SHA256 hash of the content pointed to by tokenURI
    //     bytes32 contentHash;
    //     // A SHA256 hash of the content pointed to by metadataURI
    //     bytes32 metadataHash;
    // }

    // struct BidShares {
    //     // % of sale value that goes to the _previous_ owner of the nft
    //     Decimal.D256 prevOwner;
    //     // % of sale value that goes to the original creator of the nft
    //     Decimal.D256 creator;
    //     // % of sale value that goes to the seller (current owner) of the nft
    //     Decimal.D256 owner;
    // }
