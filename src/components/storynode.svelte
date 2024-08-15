<script>
import seasonOne from "../data/DischordianSaga-1.js"

export let nodeNumber;
let isEnded;

const storyNode = {
  title: seasonOne[nodeNumber - 1].storyTitle,
  duration: getStoryDate(),
  video: `https://www.youtube.com/embed/${seasonOne[nodeNumber - 1].videoLink}`,
  text: seasonOne[nodeNumber - 1].storyText,
  options: seasonOne[nodeNumber - 1].storyOptions
}


function getStoryDate() {
  let dateStart = new Date(seasonOne[nodeNumber - 1].storyDuration[0]);
  let dateEnd = new Date(seasonOne[nodeNumber - 1].storyDuration[1]);

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
</script>



<section class="story-node-wraper">

  <iframe src={storyNode.video} class="video visible" title="YouTube" allowfullscreen />

  <div class="legend">
    <h1 class="header">
      The Dischordian Saga: { storyNode.title } - Episode { nodeNumber }
    </h1>
    <h2 class="duration">{ storyNode.duration }</h2>
  </div>

  <div class="text">{storyNode.text}</div>

  <ul class="options">
    {#each storyNode.options as option}
      <li class="option">
        {option}
      </li>
    {/each}
  </ul>

  <span class="voting-ended">
    {isEnded ? "Voting ended" : "Voting active"}
  </span>

</section>



<style>
  .story-node-wraper {
    width: 90vw;
    margin-inline: 5vw;
  }

  .video {
    position: absolute;
    height: 48.75vw;
    width: 87vw;
    top: 10.5vw;
    left: 6.5vw;
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

  .header {
    font-size: 3vw;
    text-align: center;
    -webkit-text-stroke: 0.03vw #33E2E6;
    filter: drop-shadow(0 0 0.1vw #33E2E6);
    line-height: 1.6em;
    margin-bottom: 2vw;
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
    width: 82vw;
    left: 7vw;
    overflow-y: scroll;
    height: 45vw;
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
    width: 59.8vw;
    height: 23vw;
    white-space: nowrap;
    list-style: circle inside;
    margin: 2vw;
    margin-left: 2vw;
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


  @media screen and (max-width: 600px) {
    .video {
      top: 25.5vw;
      display: block;
    }

    .legend {
      margin-bottom: 2vw;
    }
    .header {
      font-size: 1.2em;
    }
    .duration {
      font-size: 1.1em;
    }
    .text {
      position: static;
      top: auto;
      width: auto;
      left: auto;
      overflow-y: auto;
      height: auto;
      font-size: inherit;
      line-height: inherit;
      margin-bottom: 2vw;
      background-color: rgba(22, 30, 95, 0.75);
      -webkit-backdrop-filter: blur(2vw);
      backdrop-filter: blur(2vw);
      border: 0.1vw solid rgba(51, 226, 230, 0.5);
      border-radius: 2.5vw;
      padding: 3vw;
      display: block;
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

    .voting-ended {
      font-size: 1.2em;
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>