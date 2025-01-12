"use client"
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import * as bip39 from "bip39"

const GenerateWallet = () => {
  const [mnemonic, setMnemonic] = useState("")
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic")
    if (storedMnemonic) {
      setMnemonic(storedMnemonic)
    } else {
      const newMnemonic = bip39.generateMnemonic()
      setMnemonic(newMnemonic)
      localStorage.setItem("mnemonic", newMnemonic)
    }
  }, [])

  const generateWallets = () => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonic)
      const index = wallets.length

      const path = `m/44'/60'/0'/0/${index}`
      const node = ethers.utils.HDNode.fromMnemonic(mnemonic)
      const childNode = node.derivePath(path)

      const privateKey = childNode.privateKey
      const publicKey = childNode.publicKey
      const address = ethers.utils.computeAddress(publicKey)

      const newWallet = {
        privateKey: privateKey,
        publicKey: publicKey,
        address: address,
      }
      console.log("Wallet Credentials: ", address)
      setWallets((prevWallets) => [...prevWallets, newWallet])
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="w-full h-44 flex flex-col items-center border border-white rounded-lg text-white shadow-md mt-5 py-10 px-8 gap-4">
      <div className="w-full text-3xl text-white font-bold">
        Create an Etherium Wallet.
      </div>
      <div className="w-full flex items-center gap-8">
        <textarea
          className="w-3/4 h-10 bg-transparent border border-white text-white rounded-lg px-4 py-2 overflow-hidden resize-none"
          placeholder="Enter secret phrase or leave blank to generate wallet"
        ></textarea>
        <button
          className="text-white text-md bg-gray-900 px-10 py-2 font-bold border border-white rounded-lg"
          onClick={generateWallets}
        >
          Generate Wallet
        </button>
      </div>
    </div>
  )
}

export default GenerateWallet
