import { ZeroEx } from '0x.js'
import { BigNumber } from '@0xproject/utils'
import pickedTokenSymbols from '../constants/pickedTokenSymbols'
import moreTokens from '../constants/moreTokens'

const getCurrentNetworkId = (_web3) => new Promise((resolve, reject) => {
  _web3.version.getNetwork((err, networkId) => {
    if (err) return reject(err)
    resolve(+networkId)
  })
})

let zeroEx = null

export const getZeroExInstatnce = async () => {
  const web3 = window.web3
  if (typeof web3 === 'undefined') {
    throw Error('未偵測到 web3 物件')
  }
  if (zeroEx) {
    return zeroEx
  }
  try {
    const networkId = await getCurrentNetworkId(web3) // 1 for Mainnet, 42 for Kovan
    zeroEx = new ZeroEx(web3.currentProvider, { networkId: networkId })
    return zeroEx
  } catch (error) {
    console.log(error)
    throw error
  }
}

let pickedTokens = []
export const getPickedTokens = async () => {
  if (pickedTokens.length > 0) {
    return pickedTokens
  }
  const zeroEx = await getZeroExInstatnce()
  const allTokens = await zeroEx.tokenRegistry.getTokensAsync()
  pickedTokens = [
    ...allTokens.filter((token) => pickedTokenSymbols.includes(token.symbol)),
    ...moreTokens,
  ].sort((a, b) => (
    pickedTokenSymbols.indexOf(a.symbol) - pickedTokenSymbols.indexOf(b.symbol)
  ))
  return pickedTokens
}

export const getEthBalance = () => new Promise((resolve, reject) => {
  const web3 = window.web3
  if (typeof web3 === 'undefined') {
    throw Error('未偵測到 web3 物件')
  }
  const coinbase = web3.eth.coinbase
  web3.eth.getBalance(coinbase, (err, result) => {
    if (err) return reject(err)
    resolve(result)
  })
})

const notFoundToken = {
  address: null,
  decimals: null,
  name: null,
  symbol: null
}

export const getTokenByAddress = (address) => [
  ...pickedTokens.filter(item => item.address === address),
  notFoundToken
][0]

export const getTokenBySymbol = (symbol) => [
  ...pickedTokens.filter(item => item.symbol === symbol),
  notFoundToken
][0]

export const toUnitAmount = (tokenAmount, tokenAddress) => {
  const tokenInfo = getTokenByAddress(tokenAddress)
  return ZeroEx.toUnitAmount(tokenAmount, tokenInfo.decimals)
}

export const toBaseUnitAmount = (strTokenAmount, tokenAddress) => {
  const tokenInfo = getTokenByAddress(tokenAddress)
  return ZeroEx.toBaseUnitAmount(new BigNumber(strTokenAmount), tokenInfo.decimals)
}

export const displayAddress = (address) => (
  address.toUpperCase().replace('0X', '0x')
)
