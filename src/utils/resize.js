window.addEventListener('load', adjustOptionsContainer);
window.addEventListener('resize', adjustOptionsContainer);


function adjustOptionsContainer() {
  const storyOptions = document.querySelector('.options');
  const optionsCounter = document.querySelectorAll('.option').length;

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