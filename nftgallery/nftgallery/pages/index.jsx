import Head from "next/head";
import Image from "next/image";
import { useState } from 'react'
import { NFTCard } from './components/nftCard'

// 55: 20

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = async() = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log("Fetching fts");
    const api_key = "twFzi8aMeRUx8-aeV8OC45O7Zv8XLeBT";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    const fetchURL = `${baseURL}owner=${wallet}`;

    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };

      
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json);
    } else {
      console.log("Fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      var requestOptions = {
        method: "GET",
      };
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
    const api_key = "twFzi8aMeRUx8-aeV8OC45O7Zv8XLeBT";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress${collection}&withMetadata${"true"}`; 
    const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    if (nfts) {
      console.log("NFTs in collection", nfts);
      setNFTs(nfts.nfts)
    }
  }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          type={"text"}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={"text"}
          placeholder="Add the collection address"
        ></input>
        <label>
          <input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"}></input>Fetch for collection
        </label>
        <button
          onClick={() => {
            if(fetchForCollection){
            fetchNFTsForCollection()
            }else fetchNFTs()
          }}
        >
          Let's go!
        </button>
      </div>
      <div>
        {
          NFTs.length && NFTs.map(nft => {
            return [
              <NFTCard nft={nfts}></NFTCard> 
            ]
          })
        }
      </div>
    </div>
  );
};

export default Home;
