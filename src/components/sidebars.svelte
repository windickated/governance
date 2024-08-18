<script>
  import { node } from "../stores/storyNode.js"
  import seasonOne from "../data/DischordianSaga-1.js"

  function switchEpisode() {$node = this.id };

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
  <p class="episodes-legend">The Dishordian Saga</p>
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
  <div class="episodes-container">
    {#each seasonOne as episode}
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
  <div class="wallet-container">
    <p class="wallet-legend">Connect Web3 Wallet:</p>
    <p class="wallet"></p>
    <button class="wallet-connect">Connect wallet</button>
  </div>
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

  .episodes-legend {
    text-align: center;
    padding: 2vw;
    font-size: 3vw;
    color: rgba(51, 226, 230, 0.9);
    filter: drop-shadow(0 0 1vw 5vw #33E2E6);
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

  .episode:hover {
    background-color: rgba(51, 226, 230, 0.5);
    color: #33E2E6;
  }

  .episode:active {
    color: #010020;
    filter: drop-shadow(0 0 1vw rgba(51, 226, 230, 0.8));
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

  .wallet-connect:hover, .wallet-connect:active {
    background-color: rgba(22, 30, 95, 0.75);
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
      width: 100vw;
      height: 80%;
      top: -80%;
      right: auto;
      left: 0;
      background-image: none;
    }

    .episodes-legend {
      font-size: 5vw;
      padding: 3vw;
    }

    .episode {
      width: 86vw;
      margin: 4vw;
      margin-top: 0;
    }

    .episode-image {
      height: 50vw;
    }

    .episode-title {
      padding-left: 2.5%;
      font-size: 1.2em;
      line-height: 1.5em;
      width: 95%;
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
  }
</style>
