const utils = require('../helper/utils');

function fetchChain(chainId) {
  return async () => {
    const response = await utils.fetchURL('https://api.beefy.finance/tvl?q=1666600000');

    let tvl = 0;
    const chain = response.data[chainId];
    for (vault in chain) {
      if(!vault.includes("bifi")){
        tvl += Number(chain[vault]);
      }
    }
    if(tvl === 0){
      throw new Error(`chain ${chainId} tvl is 0`)
    }

    return tvl;
  }
}

async function fetch() {
  const response = await utils.fetchURL('https://api.beefy.finance/tvl?q=1666600000');

  let tvl = 0;
  for (chainId in response.data) {
    const chain = response.data[chainId];

    for (vault in chain) {
      if(!vault.includes("bifi")){
        tvl += chain[vault];
      }
    }
  }
  if(tvl === 0){
    throw new Error("tvl is 0")
  }

  return tvl;
}

module.exports = {
  cronos:{
    fetch: fetchChain(25)
  },
  bsc:{
    fetch: fetchChain(56)
  },
  fuse:{
    fetch: fetchChain(122)
  },
  heco:{
    fetch: fetchChain(128)
  },
  polygon:{
    fetch: fetchChain(137)
  },
  fantom:{
    fetch: fetchChain(250)
  },
  moonriver:{
    fetch: fetchChain(1285)
  },
  arbitrum:{
    fetch: fetchChain(42161)
  }, 
  celo:{
    fetch: fetchChain(42220)
  },
  avalanche:{
    fetch: fetchChain(43114)
  },
  harmony:{
    fetch: fetchChain(1666600000)
  },
  fetch
}
