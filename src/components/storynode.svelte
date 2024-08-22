<script>
  import { afterUpdate } from "svelte"
  import { _season, _episode, _option } from "../stores/storyNode.js"
  import { _potentials, _inactivePotentials } from "../stores/selectedNFTs.js"
  import DischordianSaga from "../data/DischordianSaga.js"


  afterUpdate(() => {
    resizeOptions();
    if (width > 600) mobileTextVisibility = true;
    if (nodeNumber) {
      optionsContainer.childNodes.forEach(option => {
        option.addEventListener('mouseover', () => {
          if (option.id != selectedOption) {
            option.style.color = '#33E2E6';
            option.style.textShadow = '0 0 3px #33E2E6';
            option.style.listStyleType = 'disc';
          }
        })
        option.addEventListener('mouseout', () => {
          if (option.id != selectedOption) {
            option.style.color = 'inherit';
            option.style.textShadow = 'none';
            option.style.listStyleType = 'circle';
          }
        })
        if (option.id != selectedOption) {
          option.style.color = 'inherit';
          option.style.textShadow = 'none';
          option.style.listStyleType = 'circle';
        }
      })
    }
  })

  let seasonNumber;
  let nodeNumber;
  let selectedOption;
  let isEnded;

  _season.subscribe(number => { seasonNumber = number });
  _episode.subscribe(number => { nodeNumber = number });
  _option.subscribe(number => { selectedOption = number });

  let selectedNFTs;
  let inactiveNFTs = [];
  _potentials.subscribe(array => selectedNFTs = array);
  _inactivePotentials.subscribe(array => inactiveNFTs = array);

  $: storyNode = {
    title: nodeNumber ? DischordianSaga[seasonNumber - 1][nodeNumber - 1].storyTitle : '',
    duration: nodeNumber ? getStoryDate() : '',
    video: nodeNumber ? `https://www.youtube.com/embed/${DischordianSaga[seasonNumber - 1][nodeNumber - 1].videoLink}` : '',
    text: nodeNumber ? DischordianSaga[seasonNumber - 1][nodeNumber - 1].storyText : '',
    options: nodeNumber ? DischordianSaga[seasonNumber - 1][nodeNumber - 1].storyOptions : ''
  }

  function getStoryDate() {
    let dateStart = new Date(DischordianSaga[seasonNumber - 1][nodeNumber - 1].storyDuration[0]);
    let dateEnd = new Date(DischordianSaga[seasonNumber - 1][nodeNumber - 1].storyDuration[1]);

    let dayStart = ('0' + dateStart.getDate()).slice(-2);
    let dayEnd = ('0' + dateEnd.getDate()).slice(-2);
    let monthStart = ('0' + (dateStart.getMonth() + 1)).slice(-2);
    let monthEnd = ('0' + (dateEnd.getMonth() + 1)).slice(-2);
    let yearStart = dateStart.getFullYear();
    let yearEnd = dateEnd.getFullYear();

    let fullDateStart = `${dayStart}.${monthStart}.${yearStart}`;
    let fullDateEnd = `${dayEnd}.${monthEnd}.${yearEnd}`;

    let fullDate = 'Duration: ' + fullDateStart + ' - ' + fullDateEnd;

    let dateNow = new Date();
    isEnded = (dateNow > dateEnd) ? true : false;

    return fullDate;
  }

  let width;
  let optionsContainer;
  function resizeOptions() {
    if(nodeNumber) {
      const optionsCounter = DischordianSaga[seasonNumber - 1][nodeNumber - 1].storyOptions.length;
      if(width >= 600) {
        if(optionsCounter == 5) {
          optionsContainer.style.fontSize = `${11/optionsCounter}vw`;
          optionsContainer.style.paddingTop = `${8/optionsCounter}vw`;
          optionsContainer.style.height = '23.5vw';
        } else if(optionsCounter == 4) {
          optionsContainer.style.fontSize = `${10/optionsCounter}vw`;
          optionsContainer.style.paddingTop = `${10/optionsCounter}vw`;
          optionsContainer.style.height = '22.75vw';
        } else {
          optionsContainer.style.fontSize = '2.5vw';
          if(optionsCounter == 3) {
            optionsContainer.style.paddingTop = '5vw';
            optionsContainer.style.height = '20.25vw';
          } else {
            optionsContainer.style.paddingTop = '7vw';
            optionsContainer.style.height = '18.25vw';
          }
        }
      } else {
        optionsContainer.style.fontSize = '1.1em';
        optionsContainer.style.paddingTop = '2vw';
        optionsContainer.style.height = 'auto';
      }
    }
  }


  function selectOption() {
    if (selectedNFTs.length > 0) {
      $_option = this.id;
      this.style.color = '#33E2E6';
      this.style.textShadow = '0 0 3px #33E2E6';
      this.style.listStyleType = 'disc';
      optionsContainer.childNodes.forEach(option => {
        if (option.id != this.id) {
          option.style.color = 'inherit';
          option.style.textShadow = 'none';
          option.style.listStyleType = 'circle';
        }
      })
      if (width <= 600) setTimeout(vote, 150);
    }
  }

  function vote() {
    alert('Season:' + seasonNumber + '\n' +
          'Episode:' + nodeNumber + '\n' +
          'Option:' + selectedOption) //vote info
    console.log('Selected NFTs:', selectedNFTs)//vote info
    selectedNFTs.map(nft => inactiveNFTs.push(nft));
    $_inactivePotentials = inactiveNFTs;
    $_potentials = [];
    $_option = undefined;
    console.log('Inactive NFTs:', inactiveNFTs) //used up
  }

  let mobileTextVisibility = false;
</script>



<svelte:window on:resize={resizeOptions} bind:outerWidth={width} />


<section class="story-node-wraper">

    <iframe src={storyNode.video} class="video visible" title="YouTube" allowfullscreen />

    <div class="legend">
      {#if nodeNumber}
        <h1 class="header">{ storyNode.title }</h1>
        <h1 class="season-episode-number">
          The Dischordian Saga: Season {seasonNumber} - Episode { nodeNumber }
      </h1>
        <h2 class="duration">{ storyNode.duration }</h2>
      {:else}
        <h1 class="empty-header">Select any episode from the tab</h1>
      {/if}
    </div>

    {#if nodeNumber}
      <div class="text">
        {#if width <= 600}
          <button class="story-text-visibility" on:click={() => {
            mobileTextVisibility = !mobileTextVisibility
          }}
          style={mobileTextVisibility ? 'border-bottom: 0.1vw solid rgba(51, 226, 230, 0.5)' : ''}
          >
            <p>
              {(mobileTextVisibility ? 'Hide' : 'Show') + ' story text'}
            </p>
            <img
              style={mobileTextVisibility ? 'transform: rotate(180deg)' : ''}
              src="/dropdown.png"
              alt={mobileTextVisibility ? 'Hide' : 'Show'}
            />
          </button>
        {/if}
        {#if mobileTextVisibility}
          {#each storyNode.text as paragraph}
            <p class="text-paragraph">{ paragraph }</p>
          {/each}
        {/if}
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
      <ul class="options" bind:this={optionsContainer}>
        {#each storyNode.options as option, index}
          <li class="option" id={index + 1} data-class={option.class}
            on:click={selectOption}>
            {option.option}
          </li>
        {/each}
      </ul>

      <span class="voting-ended {isEnded ? '' : 'voting-active'}">
        {isEnded ? "Voting ended" : "Voting active"}
      </span>
    {/if}

</section>



<style>
  .story-node-wraper {
    width: 90vw;
    margin-inline: 5vw;
  }

  .video {
    position: absolute;
    height: 47.25vw;
    width: 84.5vw;
    top: 10.25vw;
    left: 7.75vw;
    display: none;
  }

  .legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(1, 0, 32, 0.6);
    -webkit-backdrop-filter: blur(1vw);
    backdrop-filter: blur(1vw);
    margin-top: 2vw;
    margin-bottom: -4vw;
    padding: 1.5vw;
    border: 0.1vw solid rgba(51, 226, 230, 0.5);
    border-radius: 2.5vw;
  }

  .empty-header {
    font-size: 3.5vw;
    text-align: center;
    padding: 1vw 0;
    color: #33E2E6;
    opacity: 0.5;
  }

  .header, .season-episode-number {
    font-size: 3vw;
    text-align: center;
    -webkit-text-stroke: 0.03vw #33E2E6;
    filter: drop-shadow(0 0 0.1vw #33E2E6);
    line-height: 5vw;
  }

  .season-episode-number {
    font-size: 2.5vw;
    margin-bottom: 2vw;
    opacity: 0.75;
  }

  .duration {
    font-size: 2vw;
    text-align: center;
    -webkit-text-stroke: 0.03vw #33E2E6;
    filter: drop-shadow(0 0 0.1vw #33E2E6);
    color: #bebebe;
  }

  .text {
    position: absolute;
    top: 10.4vw;
    width: 80vw;
    left: 8vw;
    overflow-y: scroll;
    height: 43vw;
    font-size: 2vw;
    line-height: 3vw;
    margin-bottom: auto;
    padding: 2vw;
    background-color: none;
    backdrop-filter: none;
    border: none;
    border-radius: auto;
    color: #bebebe;
    display: none;
  }

  .story-text-visibility {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 12.5vw;
    padding: 0 4vw;
    font-size: 1.1em;
    color: rgba(51, 226, 230, 0.5);
    -webkit-text-stroke: 0.25vw rgba(51, 226, 230, 0.25);
    background-color: rgba(1, 0, 32, 0.25);
    outline: none;
    border: none;
  }

  .story-text-visibility > img {
    width: 5%;
    opacity: 0.5;
  }

  .text-paragraph {
    padding-bottom: 2vw;
  }

  .visible {
    display: block;
  }

  .text::-webkit-scrollbar {
    width: 0.3vw;
    border: none;
  }

  .text::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .text::-webkit-scrollbar-thumb {
    background-color: rgba(51, 226, 230, 0.5);
    border-radius: 0.5vw;
  }

  .options {
    position: absolute;
    top: 59vw;
    width: 59vw;
    height: 25.25vw;
    white-space: nowrap;
    list-style: circle inside;
    margin: 2vw;
    margin-left: 2.75vw;
    margin-bottom: auto;
    padding-left: 3vw;
    padding-bottom: auto;
    font-size: 1.1em;
    line-height: 2em;
    overflow-y: hidden;
    background-color: none;
    backdrop-filter: none;
    border: none;
    border-radius: none;
  }

  .options::-webkit-scrollbar {
    height: 0.5vw;
  }

  .options::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  .options::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(51, 226, 230, 0.5), rgba(0, 0, 0, 0));
    border-radius: 0.5vw;
  }

  .option {
    -webkit-text-stroke: 0.01vw #33E2E6;
    cursor: pointer;
  }

  .option:hover, .option:active {
    color: #33E2E6;
    text-shadow: 0 0 3px #33E2E6;
    list-style-type: disc;
  }

  .voting-ended {
    display: block;
    margin-inline: auto;
    margin-top: 8vw;
    margin-bottom: -4vw;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    font-size: 3vw;
    filter: drop-shadow(0 0 1vw 5vw #33E2E6);
    -webkit-text-stroke: 0.2vw rgba(255, 0, 0, 0.1);
  }

  .voting-active {
    color: rgba(51, 226, 230, 0.8);
    -webkit-text-stroke: 0.2vw rgba(0, 255, 0, 0.1);
  }


  @media screen and (max-width: 600px) {
    .video {
      top: 25.5vw;
      display: block;
    }

    .legend {
      margin-bottom: 0.5em;
      padding: 1em 0.75em;
    }

    .empty-header {
      font-size: 1.2em;
    }

    .header, .season-episode-number {
      font-size: 1.2em;
      line-height: 1.6em;
      margin-bottom: 0.5em;
    }

    .season-episode-number {
      font-size: 1em;
    }

    .duration {
      font-size: 1em;
      opacity: 0.75;
    }

    .text {
      position: static;
      top: auto;
      width: auto;
      left: auto;
      overflow-y: auto;
      height: auto;
      font-size: 1em;
      line-height: 1.75em;
      margin-bottom: 2vw;
      background-color: rgba(22, 30, 95, 0.75);
      -webkit-backdrop-filter: blur(2vw);
      backdrop-filter: blur(2vw);
      border: 0.1vw solid rgba(51, 226, 230, 0.5);
      border-radius: 2.5vw;
      padding: 0;
      display: block;
    }

    .text-paragraph {
      padding: 1.5vw 4vw 1.5vw 4vw;
    }

    .options {
      position: static;
      top: auto;
      width: 91vw;
      height: auto;
      font-size: 1.1em;
      white-space: wrap;
      margin-left: -2vw;
      margin-bottom: 4vw;
      background-color: rgba(1, 0, 32, 0.6);
      -webkit-backdrop-filter: blur(1vw);
      backdrop-filter: blur(1vw);
      border: 0.1vw solid rgba(51, 226, 230, 0.5);
      border-radius: 2.5vw;
      padding-top: 2vw;
      padding-bottom: 2vw;
    }

    .option {
      margin-bottom: 0.5em;
    }

    .option:last-child {
      margin-bottom: 0;
    }

    .voting-ended {
      font-size: 1.2em;
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>