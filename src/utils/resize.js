const nftIcon = document.querySelector('.nft-icon');
const nftBar = document.querySelector('.nft-bar');
const episodesIcon = document.querySelector('.episodes-icon');
const episodesBar = document.querySelector('.episodes-bar');
const storyOptions = document.querySelector('.options');
const optionsCounter = document.querySelectorAll('.option').length;


window.addEventListener('load', resize);
window.addEventListener('resize', resize);

function resize() {
  adjustBarsPosition();
  adjustOptionsContainer();
}


function adjustBarsPosition() {
  nftIcon.style.top = '0';
  nftIcon.style.right = '0';
  episodesIcon.style.top = '0';
  episodesIcon.style.left = '0';
  episodesIcon.style.zIndex = '19';
  if (window.outerWidth <= 600) {
    nftBar.style.top = '-80%';
    nftBar.style.left = '0';
    nftBar.style.right = '0';
    episodesBar.style.top = '-80%';
    episodesBar.style.left = '0';
  } else {
    nftBar.style.top = '0';
    nftBar.style.left = '';
    nftBar.style.right = '-80vw';
    episodesBar.style.top = '0';
    episodesBar.style.left = '-44vw';
  }
}

function adjustOptionsContainer() {
  if(window.outerWidth >= 600) {
    if(optionsCounter == 5) {
      storyOptions.style.fontSize = `${11/optionsCounter}vw`;
      storyOptions.style.paddingTop = `${9/optionsCounter}vw`;
      storyOptions.style.height = '23.5vw';
    } else if(optionsCounter == 4) {
        storyOptions.style.fontSize = `${10/optionsCounter}vw`;
        storyOptions.style.paddingTop = `${10/optionsCounter}vw`;
        storyOptions.style.height = '23.5vw';
      } else {
        storyOptions.style.fontSize = '2.5vw';
        if(optionsCounter == 3) {
          storyOptions.style.paddingTop = '5vw';
          storyOptions.style.height = '21vw';
        } else {
          storyOptions.style.paddingTop = '7vw';
          storyOptions.style.height = '19vw';
        }
    }
  } else {
    storyOptions.style.fontSize = '1.1em';
    storyOptions.style.paddingTop = '2vw';
    storyOptions.style.height = 'auto';
  }
}