<script>
const displayScreen = {
  buttons: [
    {
      id: "switcher",
      video: "/video.avif",
      text: "/text.avif",
      videoHover: "/video-hover.avif",
      textHover: "/text-hover.avif"
    },
    {
      id: "vote",
      image: "/vote-clickable.avif",
      hover: "/vote-hover.avif",
      click: "/vote-active.avif",
      inactive: "/vote-inert.avif"
    }
  ],
  display: {
    fullsize: "/display.avif",
    mobilesize: "/displayMobile.avif",
    BG: "/displayBG.avif",
    mobileBG: "/displayMobileBG.avif"
  }
}

// Format button
let formatButtonState = false;
let formatButtonHover = false;
const switcherHandle = (event) => {
  if (event.type === 'click') {
    formatButtonState = !formatButtonState;
  } else if (
    event.type === 'mouseover' || event.type === 'mouseout') {
    formatButtonHover = !formatButtonHover;
  }
}

// Vote button
let voteIsInactive = true; //prohibits voting
let voteButtonState = true;
let voteButtonHover = false;
const voteHandle = (event) => {
  if (!voteIsInactive && voteButtonState) {
    if (event.type === 'click') {
      voteButtonState = !voteButtonState;
    } else if (
      event.type === 'mouseover' || event.type === 'mouseout') {
        voteButtonHover = !voteButtonHover;
    }
  }
}
</script>


<div class="display-screen">
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div class="display-buttons">
    <div
      class="format"
      role="button"
      tabindex="0"
      on:click={switcherHandle}
      on:mouseover={switcherHandle}
      on:mouseout={switcherHandle}
    >
      <img
        class="format-btn {!formatButtonHover ? (formatButtonState ? 'visible' : '') : ''}"
        src={displayScreen.buttons[0].video}
        alt="Switcher"
        draggable="false"
      />
      <img
        class="format-btn {!formatButtonHover ? (!formatButtonState ? 'visible' : '') : ''}"
        src={displayScreen.buttons[0].text}
        alt="Switcher"
        draggable="false"
      />
      <img
        class="format-btn {!formatButtonState ? (formatButtonHover ? 'visible' : '') : ''}"
        src={displayScreen.buttons[0].videoHover}
        alt="Switcher"
        draggable="false"
      />
      <img
        class="format-btn {formatButtonState ? (formatButtonHover ? 'visible' : '') : ''}"
        src={displayScreen.buttons[0].textHover}
        alt="Switcher"
        draggable="false"
      />
    </div>
    <div
      class="vote"
      role="button"
      tabindex="0"
      on:click={voteHandle}
      on:mouseover={voteHandle}
      on:mouseout={voteHandle}
    >
      <img
        class="vote-btn {!voteIsInactive ? (!voteButtonHover ? (voteButtonState ? 'visible' : '') : '') : ''}"
        src={displayScreen.buttons[1].image}
        alt="Vote"
        draggable="false"
      />
      <img
        class="vote-btn {!voteIsInactive ? (voteButtonState ? (voteButtonHover ? 'visible' : '') : '') : ''}"
        src={displayScreen.buttons[1].hover}
        alt="Vote"
        draggable="false"
      />
      <img
        class="vote-btn {!voteIsInactive ? (!voteButtonState ? 'visible' : '') : ''}"
        src={displayScreen.buttons[1].click}
        alt="Vote"
        draggable="false"
      />
      <img
        class="vote-btn {voteIsInactive ? 'visible' : ''}"
        src={displayScreen.buttons[1].inactive}
        alt="Vote"
        draggable="false"
      />
    </div>
  </div>
  <picture class="display">
    <source srcset={displayScreen.display.mobilesize} media="(max-width: 600px)" />
    <img src={displayScreen.display.fullsize} alt="Display" />
  </picture>
  <!-- <iframe src="https://www.youtube.com/embed/hDmI82bvDhc" id="video" title="YouTube" allowfullscreen /> -->
  <picture class="display-bg">
    <source srcset={displayScreen.display.mobileBG} media="(max-width: 600px)" />
    <img src={displayScreen.display.BG} alt="Background" />
  </picture>
</div>


<style>
  .display-screen {
    position: relative;
    width: 98vw;
    margin-inline: 1vw;
    margin-top: 2.5vw;
  }

  .display, .display-bg {
    height: auto;
  }

  .display-bg {
    z-index: -10;
    position: absolute;
    top: 0;
    left: 0;
  }

  #video {
    position: absolute;
    height: 48.75vw;
    width: 87vw;
    top: 8vw;
    left: 5.5vw;
  }

  .display-buttons {
    z-index: 10;
    position: absolute;
    width: 27.5%;
    bottom: 0;
    right: 0;
    background-image: url("/format.avif");
    background-position: top;
    background-size: contain;
  }


  .format-btn, .vote-btn {
    display: none;
    cursor: pointer;
  }

  .visible {
    display: block;
  }


  @media screen and (max-width: 600px) {
    .format-btn, .vote-btn {
      display: none !important;
    }
  }

</style>