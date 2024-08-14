<script>
const consolePanel = {
  buttons: [
    {
      id: "conexus",
      image: "/conexus.avif",
      hover: "/conexus-hover.avif",
      click: "/conexus-active.avif",
      size: "big"
    },
    {
      id: "back",
      image: "/back.avif",
      hover: "/back-hover.avif",
      click: "/back-active.avif",
      size: "small"
    },
    {
      id: "omnihub",
      image: "/omnihub-inactive.avif", ///omnihub.avif
      hover: "/omnihub-hover.avif",
      click: "/omnihub-active.avif",
      size: "big"
    },
    {
      id: "forward",
      image: "/forward.avif",
      hover: "/forward-hover.avif",
      click: "/forward-active.avif",
      size: "small"
    },
    {
      id: "sagaverse",
      image: "/sagaverse.avif",
      hover: "/sagaverse-hover.avif",
      click: "/sagaverse-active.avif",
      size: "big"
    }
  ],
  console: {
    fullsize: "/console.avif",
    mobilesize: "/consoleMobile.avif"
  }
}

const consoleButtonsHandle = (event, id, isActive = false) => {
  if (id != 'omnihub') { //temporarily disabled Omnihub
    const button = document.getElementById(id);
    const buttonHover = document.getElementById(`${id}-hover`);
    const buttonActive = document.getElementById(`${id}-active`);
    if (event.type === 'click') {
      button.style.display = 'none';
      buttonHover.style.display = 'none';
      buttonActive.style.display = 'block';
    } else if (event.type === 'mouseover' && !isActive) {
      button.style.display = 'none';
      buttonHover.style.display = 'block';
      buttonActive.style.display = 'none';
    } else if (isActive) {
      button.style.display = 'none';
      buttonActive.style.display = 'block';
      setTimeout(() => {
        button.style.display = 'block';
        buttonActive.style.display = 'none';
        switch (id) {
          case 'sagaverse': window.open('https://sagaverse.vercel.app', '_blank');
          case 'conexus': window.open('https://conexus.vercel.app', '_blank');
        }
      }, 150)
    } else if (event.type === 'mouseout') {
      button.style.display = 'block';
      buttonHover.style.display = 'none';
      buttonActive.style.display = 'none';
    }
  }
}
</script>


<div class="console-panel">
  <div class="console-buttons">
    {#each consolePanel.buttons as button}
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div class="{button.id} {button.size}">
        <img
          on:mouseover={() => {consoleButtonsHandle(event, button.id)}}
          class="console-btn visible"
          id={button.id}
          src={button.image}
          alt={button.id}
          draggable="false" 
        />
        <img
          on:click={() => {consoleButtonsHandle(event, button.id)}}
          on:mouseout={() => {consoleButtonsHandle(event, button.id)}}
          class="console-btn"
          id="{button.id}-hover"
          src={button.hover}
          alt={button.id}
          draggable="false"
        />
        <img
          on:mouseover={() => {consoleButtonsHandle(event, button.id, true)}}
          class="console-btn"
          id="{button.id}-active"
          src={button.click}
          alt={button.id}
          draggable="false"
        />
      </div>
    {/each}
  </div>
  <picture class="console">
    <source srcset={consolePanel.console.mobilesize} media="(max-width: 600px)" />
    <img src={consolePanel.console.fullsize} alt="Console" />
  </picture>
</div>


<style>
  .console-panel {
    position: relative;
  }

  .console-buttons {
    z-index: 10;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
  }

  .console-btn {
    display: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .visible {
    display: block;
  }

  @media screen and (width > 600px) {
    .big {
      width: 20%;
    }

    .small {
      width: 10%;
    }
  }

</style>