"use client"
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import * as bip39 from "bip39"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const GenerateWallet = () => {
  const [mnemonic, setMnemonic] = useState("")
  const [wallets, setWallets] = useState([])
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false)

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

  const togglePrivateKeyVisibility = () => {
    setIsPrivateKeyVisible((prevState) => !prevState)
  }
  const copyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic)
    toast.success("Copied to Clipboard!") // Show the toast when copied
  }
  return (
    <>
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
      {wallets.length > 0 && (
        <div className="w-full flex flex-col border border-white rounded-lg text-white shadow-md mt-5 px-8 ">
          <div className="text-lg text-white  py-4 px-4 flex items-center justify-between ">
            <span className="font-bold">Mnemonic Phrase:</span>
            <button
              className="text-white text-sm bg-gray-800 px-4 py-1 font-bold border rounded-lg"
              onClick={copyMnemonic}
            >
              Copy Phrase
            </button>
          </div>

          <div className="grid grid-cols-4 px-4 mt-2 mb-4 gap-4 text-center">
            {mnemonic.split(" ").map((word, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white py-2 rounded-md w-full "
              >
                {word}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-lg text-white font-bold mb-2 py-4 px-4">
              Generated Wallets:
            </div>
            <div className="px-4">
              {wallets.map((wallet, index) => (
                <div
                  key={index}
                  className="w-3/4 border border-white px-4 py-4 rounded-lg mb-4 gap-8"
                >
                  <div className="flex flex-col space-y-2">
                    <p>
                      <span className="font-bold ">Address :</span>{" "}
                      {wallet.address}
                    </p>
                    <p>
                      <span className="font-bold">Public Key :</span>{" "}
                      {wallet.publicKey}
                    </p>
                    <div className="flex items-center gap-2 relative">
                      <p className="mr-2">
                        <span className="font-bold">Private Key :</span>{" "}
                        {isPrivateKeyVisible
                          ? wallet.privateKey
                          : new Array(wallet.privateKey.length)
                              .fill(" •")
                              .join("")}
                      </p>
                      <button
                        className="text-md text-white bg-gray-800 px-4 py-1 rounded-lg absolute right-0 "
                        onClick={togglePrivateKeyVisibility}
                      >
                        {isPrivateKeyVisible ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  )
}

export default GenerateWallet
