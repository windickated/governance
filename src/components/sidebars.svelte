<script>
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
  const BG = document.querySelector('.bg');

  if (episodesBarState) handleEpisodesBar();

  if (!nftBarState) {
    if (window.outerWidth <= 600) {
      nftsInterval = setInterval(() => { slideBarMobile(true, 'nfts') }, 5);
    } else {
      nftsInterval = setInterval(() => { slideBarPC(true, 'nfts') }, 5);
    }
    nftBarState = true;
    iconHandle('nfts');
    BG.style.display = 'block';
  } else {
    if (window.outerWidth <= 600) {
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
  const BG = document.querySelector('.bg');

  if (nftBarState) handleNFTsBar();

  if (!episodesBarState) {
    if (window.outerWidth <= 600) {
      episodesInterval = setInterval(() => { slideBarMobile(true, 'episodes') }, 5);
    } else {
      episodesInterval = setInterval(() => { slideBarPC(true, 'episodes') }, 5);
    }
    episodesBarState = true;
    iconHandle('episodes');
    BG.style.display = 'block';
  } else {
    if (window.outerWidth <= 600) {
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
  const nftIcon = document.querySelector('.nft-icon');
  const episodesIcon = document.querySelector('.episodes-icon');
  if (window.outerWidth <= 600) {
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
        nftIcon.style.backgroundImage = "url('/sideIconPCOpen.avif')";
      } else {
        nftIcon.style.backgroundImage = "url('/sideIconPCClose.avif')";
      }
    } else if (tab === 'episodes') {
      if (episodesBarState) {
        episodesIcon.style.backgroundImage = "url('/episodesPCOpen.avif')";
      } else {
        episodesIcon.style.backgroundImage = "url('/episodesPCClose.avif')";
      }
    }
  }
}

// Utility function for PC tabs handling
function slideBarPC(open, tab) {
  const nftIcon = document.querySelector('.nft-icon');
  const nftBar = document.querySelector('.nft-bar');
  const episodesIcon = document.querySelector('.episodes-icon');
  const episodesBar = document.querySelector('.episodes-bar');

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
  const nftIcon = document.querySelector('.nft-icon');
  const nftBar = document.querySelector('.nft-bar');
  const episodesIcon = document.querySelector('.episodes-icon');
  const episodesBar = document.querySelector('.episodes-bar');
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



<!-- --- Episodes tab --- -->

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<span
  role="button"
  tabindex="0"
  class="episodes-icon"
  on:click={handleEpisodesBar}
/>

<div class="episodes-bar">

</div>



<!-- --- NFTs tab --- -->

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<span
  role="button" 
  tabindex="0"
  class="nft-icon"
  on:click={handleNFTsBar}
/>

<div class="nft-bar">

</div>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions
a11y-no-static-element-interactions -->
<div class="bg" on:click={closeActiveTab}></div>


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
  }
</style>
