<script>
  import { afterUpdate } from "svelte"
  import { _season, _episode } from "../stores/storyNode.js"
  import { _potentials } from "../stores/selectedNFTs.js"
  import DischordianSaga from "../data/DischordianSaga.js"


  /* --- EPISODES tab --- */

  let episodes;
  let seasonNumber;
  let nodeNumber;

  _season.subscribe(number => { seasonNumber = number });

  _episode.subscribe(number => { nodeNumber = number });

  afterUpdate(() => {
    if (nodeNumber) activeEpisode(nodeNumber);
    if (selectedNFTs.length == 0) {
      potentials.forEach(nft => nft.clicked = false);
      nftTiles && nftTiles.childNodes.forEach(tile => {
        tile.style.backgroundColor = 'rgba(22, 30, 95, 0.75)';
        tile.style.filter = 'drop-shadow(0 0 0.1vw #010020)';
        tile.style.color = 'inherit';
      })
    }
  })

  function switchSeason() {
    $_season = this.value;
    $_episode = undefined;
    activeEpisode(0);
  }

  function switchEpisode() { $_episode = this.id };

  function activeEpisode(id) {
    episodes.childNodes.forEach(episode => {
      if (id == episode.id) {
        episode.style.color = '#010020';
        episode.style.filter = 'drop-shadow(0 0 1vw rgba(51, 226, 230, 0.8))';
      } else {
        episode.style.color = 'inherit';
        episode.style.filter = 'none';
      }
    })
  }


  /* --- NFTs tab --- */

  let walletContainer;
  let walletLegend;
  let wallet;
  let walletButton;
  let isConnected = false;

  let selectedNFTs;
  _potentials.subscribe(array => selectedNFTs = array);

  const nftNumbers = [1, 3, 5, 11, 22, 38, 49, 79, 121, 200, 298, 305, 374, 489, 592, 645, 788, 815, 890, 950, 970];
  class nftTile {
    constructor(data, i) {
      this.id = i;
      this.name = data[i].name;
      this.image = data[i].image;
      this.class = data[i].attributes[5].value;
      this.clicked = false;
      this.active = true;
    } 
  }

  const potentials = [];
  const getNFTs = async () => { //test func
    const metadata = [];
    for(let i in nftNumbers) {
      const response = await fetch(`https://api.degenerousdao.com/nft/data/${nftNumbers[i]}`);
      metadata[i] = await response.json();
      potentials[i] = new nftTile(metadata, i);
    }
  }

  let nftTiles;
  function selectNFT() {
    $_potentials = [];
    potentials[this.id].clicked = !potentials[this.id].clicked;
    nftTiles.childNodes.forEach(tile => {
      if (tile.id == this.id) {
        if (potentials[this.id].clicked) {
          tile.style.backgroundColor = '#2441BD';
          tile.style.filter = 'drop-shadow(0 0 0.5vw rgba(51, 226, 230, 1))';
          tile.style.color = '#33E2E6';
        } else {
          tile.style.backgroundColor = 'rgba(22, 30, 95, 0.75)';
          tile.style.filter = 'drop-shadow(0 0 0.1vw #010020)';
          tile.style.color = 'inherit';
        }
      }
    })
    potentials.map(nft => {
      if (nft.clicked) $_potentials.push(nft);
    })
    // console.log(selectedNFTs)
  }

  function connectWallet() { //test func
    isConnected = !isConnected;
    if (isConnected) {
      walletButton.innerHTML = 'Disconect';
      walletButton.style.backgroundColor = 'rgba(51, 226, 230, 0.9)';
      walletButton.style.color = '#010020';
      walletLegend.style.color = '#33E2E6';
      walletLegend.style.display = 'none';
      wallet.style.display = 'block';
      wallet.innerHTML = '0xeb0a...60c1';
      walletContainer.style.backgroundColor = 'rgba(22, 30, 95, 0.75)';
      walletContainer.style.filter = 'drop-shadow(0 0 0.5vw rgba(51, 226, 230, 0.2))';
      getNFTs();
    } else {
      walletButton.innerHTML = 'Connect wallet';
      walletButton.style.backgroundColor = '#161E5F';
      walletButton.style.color = '#33E2E6';
      walletLegend.style.color = '#010020';
      walletLegend.style.display = 'block';
      wallet.style.display = 'none';
      wallet.innerHTML = '';
      walletContainer.style.filter = 'drop-shadow(0 0 1vw rgba(51, 226, 230, 0.5))';
      walletContainer.style.backgroundColor = 'rgba(51, 226, 230, 0.5)';
    }
  }


  /* --- TABS HANDLING --- */

  let width;
  let nftIcon;
  let episodesIcon;
  let nftBar;
  let episodesBar;
  let BG;

  let nftBarState = false;
  let episodesBarState = false;

  let nftsBarPosition = nftBarState ? 80 : 0;
  let episodesBarPosition = episodesBarState ? 44 : 0;

  let nftsInterval;
  let episodesInterval;

  function closeActiveTab() {
    if (episodesBarState) handleEpisodesBar();
    if (nftBarState) handleNFTsBar();
  }

  // NFTs tab opening
  function handleNFTsBar() {
    if (episodesBarState) handleEpisodesBar();

    if (!nftBarState) {
      if (width <= 600) {
        nftsInterval = setInterval(() => { slideBarMobile(true, 'nfts') }, 5);
      } else {
        nftsInterval = setInterval(() => { slideBarPC(true, 'nfts') }, 5);
      }
      nftBarState = true;
      iconHandle('nfts');
      BG.style.display = 'block';
    } else {
      if (width <= 600) {
        nftsInterval = setInterval(() => { slideBarMobile(false, 'nfts') }, 5);
      } else {
        nftsInterval = setInterval(() => { slideBarPC(false, 'nfts') }, 5);
      }
      nftBarState = false;
      iconHandle('nfts');
      BG.style.display = 'none';
    }
  }

  //Episodes tab opening
  function handleEpisodesBar() {
    if (nftBarState) handleNFTsBar();

    if (!episodesBarState) {
      if (width <= 600) {
        episodesInterval = setInterval(() => { slideBarMobile(true, 'episodes') }, 5);
      } else {
        episodesInterval = setInterval(() => { slideBarPC(true, 'episodes') }, 5);
      }
      episodesBarState = true;
      iconHandle('episodes');
      BG.style.display = 'block';
    } else {
      if (width <= 600) {
        episodesInterval = setInterval(() => { slideBarMobile(false, 'episodes') }, 5);
      } else {
        episodesInterval = setInterval(() => { slideBarPC(false, 'episodes') }, 5);
      }
      episodesBarState = false;
      iconHandle('episodes');
      BG.style.display = 'none';
    }
  }

  // Utility function for icons switching
  function iconHandle(tab) {
    if (width <= 600) {
      if (tab === 'nfts') {
        if (nftBarState) {
          episodesIcon.style.zIndex = '19';
          episodesIcon.style.backgroundImage = "url('/episodesMobileOpen-Inactive.avif')";
          nftIcon.style.backgroundImage = "url('/sideIconMobileClose.avif')";
        } else {
          episodesIcon.style.zIndex = '19';
          episodesIcon.style.backgroundImage = "url('/episodesMobileOpen.avif')";
          nftIcon.style.backgroundImage = "url('/sideIconMobileOpen.avif')";
        }
      } else if (tab === 'episodes') {
        if (episodesBarState) {
          episodesIcon.style.zIndex = '22';
          episodesIcon.style.backgroundImage = "url('/episodesMobileClose.avif')";
          nftIcon.style.backgroundImage = "url('/sideIconMobileOpen-Inactive.avif')";
        } else {
          episodesIcon.style.zIndex = '19';
          episodesIcon.style.backgroundImage = "url('/episodesMobileOpen.avif')";
          nftIcon.style.backgroundImage = "url('/sideIconMobileOpen.avif')";
        }
      }
    } else {
      if (tab === 'nfts') {
        if (nftBarState) {
          nftIcon.style.backgroundImage = "url('/sideIconPCClose.avif')";
        } else {
          nftIcon.style.backgroundImage = "url('/sideIconPCOpen.avif')";
        }
      } else if (tab === 'episodes') {
        if (episodesBarState) {
          episodesIcon.style.backgroundImage = "url('/episodesPCClose.avif')";
        } else {
          episodesIcon.style.backgroundImage = "url('/episodesPCOpen.avif')";
        }
      }
    }
  }

  // Utility function for PC tabs handling
  function slideBarPC(open, tab) {
    if (tab === 'nfts') {
      if (open) {
        if (nftsBarPosition == 80) {
          clearInterval(nftsInterval);
        } else {
          nftsBarPosition += 4;
          nftIcon.style.right = `${nftsBarPosition}vw`;
          nftBar.style.right = `${nftsBarPosition - 80}vw`;
        }
      } else {
        if(nftsBarPosition == 0) {
          clearInterval(nftsInterval);
        } else {
          nftsBarPosition -= 4;
          nftIcon.style.right = `${nftsBarPosition}vw`;
          nftBar.style.right = `${nftsBarPosition - 80}vw`;
        }
      }
    } else if (tab === 'episodes') {
      if (open) {
        if (episodesBarPosition == 40) {
          clearInterval(episodesInterval);
        } else {
          episodesBarPosition += 4;
          episodesIcon.style.left = `${episodesBarPosition + 4}vw`;
          episodesBar.style.left = `${episodesBarPosition - 40}vw`;
        }
      } else {
        if(episodesBarPosition == 0) {
          clearInterval(episodesInterval);
        } else {
          episodesBarPosition -= 4;
          episodesIcon.style.left = `${episodesBarPosition}vw`;
          episodesBar.style.left = `${episodesBarPosition - 44}vw`;
        }
      }
    }
  }

  // Utility function for Mobile tabs handling
  function slideBarMobile(open, tab) {
    if (open) {
      if (tab === 'nfts') {
        if (nftsBarPosition == 80) {
          clearInterval(nftsInterval);
        } else {
          nftsBarPosition += 4;
          if (!episodesBarState) episodesIcon.style.top = `${nftsBarPosition}%`;
          nftIcon.style.top = `${nftsBarPosition}%`;
          nftBar.style.top = `${nftsBarPosition - 80}%`;
        }
      } else if (tab === 'episodes') {
        if (episodesBarPosition == 80) {
          clearInterval(episodesInterval);
        } else {
          episodesBarPosition += 4;
          if (!nftBarState) nftIcon.style.top = `${episodesBarPosition}%`;
          episodesIcon.style.top = `${episodesBarPosition}%`;
          episodesBar.style.top = `${episodesBarPosition - 80}%`;
        }
      }
    } else {
      if (tab === 'nfts') {
        if(nftsBarPosition == 0) {
          clearInterval(nftsInterval);
        } else {
          nftsBarPosition -= 4;
          if (!episodesBarState) episodesIcon.style.top = `${nftsBarPosition}%`;
          nftIcon.style.top = `${nftsBarPosition}%`;
          nftBar.style.top = `${nftsBarPosition - 80}%`;
        }
      } else if (tab === 'episodes') {
        if(episodesBarPosition == 0) {
          clearInterval(episodesInterval);
        } else {
          episodesBarPosition -= 4;
          if (!nftBarState) nftIcon.style.top = `${episodesBarPosition}%`;
          episodesIcon.style.top = `${episodesBarPosition}%`;
          episodesBar.style.top = `${episodesBarPosition - 80}%`;
        }
      }
    }
  }
</script>



<svelte:window bind:outerWidth={width} />


<!-- --- Episodes tab --- -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<span
  bind:this={episodesIcon}
  role="button"
  tabindex="0"
  class="episodes-icon"
  on:click={handleEpisodesBar}
/>

<div class="episodes-bar" bind:this={episodesBar}>
  <p class="season-title">The Dishordian Saga</p>
  <select class="season" on:change={switchSeason}>
    {#each DischordianSaga as season, number}
      <option value={number + 1}>
        Season {number + 1}
      </option>
    {/each}
  </select>
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
  <div class="episodes-container" bind:this={episodes}>
    {#each DischordianSaga[seasonNumber - 1] as episode}
      <div
        role="button"
        tabindex="0"
        class="episode"
        id={episode.episode}
        on:click={switchEpisode}
      >
        <img
          class="episode-image"
          src="https://img.youtube.com/vi/{episode.videoLink}/hqdefault.jpg"
          alt="Episode {episode.episode}"
        />
        <p class="episode-title">{episode.storyTitle}</p>
        <p class="episode-number">Episode {episode.episode}</p>
      </div>
    {/each}
  </div>
</div>


<!-- --- NFTs tab --- -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<span
  bind:this={nftIcon}
  role="button" 
  tabindex="0"
  class="nft-icon"
  on:click={handleNFTsBar}
/>

<div class="nft-bar" bind:this={nftBar}>
  <div class="wallet-container" bind:this={walletContainer}>
    <p class="wallet-legend" bind:this={walletLegend}>
      Connect Web3 Wallet:
    </p>
    <p class="wallet" bind:this={wallet}></p>
    <button
      class="wallet-connect"
      bind:this={walletButton}
      on:click={connectWallet}
    >
      Connect wallet
    </button>
  </div>
  {#if isConnected}
    <div class="nfts-legend">
      <p class="nfts-total">Total NFTs: {potentials.length}</p>
      <p class="nfts-selected">Selected NFTs: {selectedNFTs.length}</p>
    </div>
    <div class="nfts-container" bind:this={nftTiles}>
      {#each potentials as NFT}
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions
        a11y-no-static-element-interactions -->
        <div class="nft" id={NFT.id} on:click={selectNFT}>
          <img class="nft-image" src={NFT.image} alt={NFT.name} />
          <p class="nft-name">{ NFT.name }</p>
          <p class="nft-class">{ NFT.class }</p>
        </div>
      {/each}
    </div>
  {/if}
</div>


<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions
a11y-no-static-element-interactions -->
<div class="bg" on:click={closeActiveTab} bind:this={BG}></div>



<style>
  .nft-icon {
    position: fixed;
    z-index: 21;
    top: 0;
    right: 0;
    height: 7.5vw;
    width: 15vw;
    filter: drop-shadow(-0.1vw 0.1vw 0.5vw #010020);
    cursor: pointer;
    background-image: url('/sideIconPCOpen.avif');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top;
  }

  .episodes-icon {
    position: fixed;
    z-index: 19;
    top: 0;
    left: 0;
    height: 7.5vw;
    width: 20vw;
    filter: drop-shadow(0.1vw 0.1vw 0.5vw #010020);
    cursor: pointer;
    background-image: url('/episodesPCOpen.avif');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top;
  }

  .nft-bar {
    position: fixed;
    z-index: 20;
    top: 0;
    left: auto;
    right: -80vw;
    height: 100%;
    width: 80vw;
    background-image: url("/sideBorder.avif");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: rgba(1, 0, 32, 0.5);
    -webkit-backdrop-filter: blur(1vw);
    backdrop-filter: blur(1vw);
    filter: drop-shadow(-0.1vw 0.1vw 0.5vw #010020);
    overflow-y: scroll;
  }

  .episodes-bar {
    position: fixed;
    z-index: 18;
    top: 0;
    left: -44vw;
    height: 100%;
    width: 40vw;
    display: flex;
    flex-flow: column nowrap;
    background-image: url('/sideBorder.avif');
    background-size: contain;
    background-repeat: no-repeat;
    background-color: rgba(1, 0, 32, 0.5);
    background-position: right;
    -webkit-backdrop-filter: blur(1vw);
    backdrop-filter: blur(1vw);
    filter: drop-shadow(-0.1vw 0.1vw 0.5vw #010020);
    overflow-y: scroll;
    padding: 1vw 2vw;
  }

  .nft-bar::-webkit-scrollbar, .episodes-bar::-webkit-scrollbar {
    width: 0px;
  }

  .bg {
    display: none;
    position: fixed;
    z-index: 15;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(1vw);
    backdrop-filter: blur(1vw);
  }

  /* EPISODES bar */

  .season-title {
    text-align: center;
    padding: 2vw;
    font-size: 2.5vw;
    color: rgba(51, 226, 230, 0.9);
    filter: drop-shadow(0 0 1vw 5vw #33E2E6);
  }

  .season {
    width: 35vw;
    margin-inline: auto;
    margin-top: 1vw;
    margin-bottom: 2vw;
    text-align: center;
    font-size: 2vw;
    padding: 1vw 0;
    line-height: 3vw;
    color: rgba(1, 0, 32, 0.9);
    outline: none;
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 2vw;
    background-color: rgba(51, 226, 230, 0.5);
    cursor: pointer;
  }

  .episode {
    width: 35vw;
    padding: 1vw;
    margin: 1vw;
    margin-bottom: 2vw;
    background-color: rgba(51, 226, 230, 0.4);
    border: 0.05vw solid #33E2E6;
    border-radius: 1.5vw;
    cursor: pointer;
  }

  .episode-image {
    object-fit: cover;
    border: 0.05vw solid #33E2E6;
    border-radius: 1vw;
    width: 100%;
    height: 20vw;
  }

  .episode-title {
    padding-top: 0.5vw;
    padding-bottom: 0.5vw;
    text-align: center;
    white-space: wrap;
    width: 35vw;
    font-size: 2.5vw;
    line-height: 3vw;
    text-shadow: 0 0 0.1vw #010020;
  }

  .episode-number {
    text-align: center;
    font-size: 2vw;
    padding-top: 0.5vw;
    opacity: 0.75;
  }

  .episode:hover {
    background-color: rgba(51, 226, 230, 0.5);
    color: #33E2E6;
  }

  /* NFTs bar */

  .wallet-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(51, 226, 230, 0.5);
    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.5));
    margin: 3vw 5vw 1vw 5vw;
    padding: 1vw 2vw;
    border: 0.05vw solid #33E2E6;
    border-radius: 1.5vw;
  }

  .wallet-legend {
    color: #161E5F;
    font-size: 2.5vw;
    filter: drop-shadow(0 0 0.05vw #010020);
    text-align: right;
    padding-right: 2.5vw;
  }

  .wallet {
    display: none;
    padding: 0 3vw;
    font-size: 2vw;
    color: rgba(51, 226, 230, 1);
    background-color: rgba(51, 226, 230, 0.2);
    border: 0.05vw solid #33E2E6;
    border-radius: 1vw;
    line-height: 3.5vw;
  }

  .wallet-connect {
    height: 3.5vw;
    width: 18vw;
    border: 0.05vw solid #33E2E6;
    border-radius: 1vw;
    font-size: 2vw;
    background-color: #161E5F;
    color: #33E2E6;
  }

  .nfts-legend {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .nfts-total, .nfts-selected {
    color: #33E2E6;
    -webkit-text-stroke: 0.1vw #33E2E6;
    padding-top: 2.5vw;
    padding-bottom: 1vw;
    padding-left: 5vw;
    padding-right: 5vw;
    font-size: 2vw;
  }

  .nfts-container {
    display: flex;
    flex-wrap: wrap;
    padding: 1vw 2vw;
  }

  .nft {
    position: relative;
    box-sizing: border-box;
    width: 17vw;
    height: 23vw;
    background-color: rgba(22, 30, 95, 0.75);
    margin: 1vw;
    border: 0.05vw solid #33E2E6;
    border-radius: 1.5vw;
    padding-bottom: 1vw;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    filter: drop-shadow(0 0 0.1vw #010020);
  }

  .nft:hover {
    background-color: rgba(22, 30, 95, 1);
    filter: drop-shadow(0 0 0.5vw rgba(51, 226, 230, 1));
  }

  .nft-image {
    object-fit: cover;
    height: 70%;
    width: 95%;
    margin: 2.5%;
    border: 0.05vw solid #33E2E6;
    border-radius: 1vw;
  }

  .nft-name {
    font-size: 2vw;
    line-height: 2.5vw;
  }

  .nft-class {
    font-size: 1.5vw;
    line-height: 2.5vw;
    opacity: 0.75;
  }


  @media screen and (max-width: 600px) {
    .nft-icon {
      width: 90vw;
      height: 12vw;
      top: 0;
      filter: drop-shadow(0 0.5vw 1vw #010020);
      background-image: url('/sideIconMobileOpen.avif');
    }

    .episodes-icon {
      width: 31.6vw;
      height: 12vw;
      filter: drop-shadow(0 0.5vw 1vw #010020);
      background-image: url('/episodesMobileOpen.avif');
    }

    .nft-bar, .episodes-bar {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      width: 100vw;
      height: 80%;
      top: -80%;
      right: auto;
      left: 0;
      padding: 0;
      background-image: none;
    }

    .season-title {
      font-size: 1.5em;
      line-height: 3em;
      padding: 0;
    }

    .season {
      width: 80vw;
      font-size: 1.2em;
      line-height: 1.5em;
      margin: 0;
      margin-bottom: 1em;
    }

    .episode {
      width: 86vw;
      margin-top: 0;
      margin-bottom: 1em;
    }

    .episode-image {
      height: 48vw;
    }

    .episode-title {
      padding-left: 2.5%;
      font-size: 1.2em;
      line-height: 1.5em;
      width: 95%;
    }

    .episode-number {
      font-size: inherit;
    }

    .wallet-container {
      margin-top: 6vw;
      margin-bottom: 2vw;
      height: 14vw;
    }

    .wallet-legend {
      font-size: inherit;
    }

    .wallet {
      font-size: inherit;
      padding: 2vw 3vw;
    }

    .wallet-connect {
      font-size: inherit;
      width: 38vw;
      height: 10vw;
    }

    .nfts-total, .nfts-selected {
      font-size: inherit;
    }

    .nft {
      width: 46vw;
      height: 60vw;
      padding-bottom: 4vw;
    }

    .nft-name {
      font-size: 1.2em;
    }

    .nft-class {
      font-size: 0.9em;
    }
  }
</style>
