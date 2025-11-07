function checkForAd() {
  // Check if the ad is visible
  videoAd = document.querySelector(".ytp-ad-player-overlay-layout");
  if (videoAd) {
    return true;
  }
  return false;
}

function enlargeSkipButton() {
  // Enlarge the skip button to make it more clickable, but not block the player
  const skipButton = document.querySelector(".ytp-skip-ad-button");

  if (skipButton) {
    // Only slightly increase size and z-index
    skipButton.style.setProperty("display", "block", "important");
    skipButton.style.transform = "scale(1.5)";
    skipButton.style.zIndex = "9999";
    skipButton.style.opacity = "1";
    // Remove pointerEvents and absolute positioning
    return true;
  } else {
    console.warn("Skip button not found");
    return false;
  }
}

function skipAhead(videoAd, seconds = 20) {
  try {
    const target = Math.min(
      videoAd.duration || Infinity,
      videoAd.currentTime + seconds
    );
    videoAd.currentTime = target;
    console.log(`Skipped ahead ${seconds} seconds`);
    return true;
  } catch (e) {
    console.error("Failed to skip ahead:", e);
    return false;
  }
}

function startObserver() {
  const videoAd = document.querySelector(".video-stream html5-main-video");
  if (location.hostname === "www.youtube.com") {
    let throttleTimeout;
    const throttleDelay = 1000; // 1000 ms
    const observer = new MutationObserver((mutations) => {
      if (throttleTimeout) return; // Skip if already waiting
      throttleTimeout = window.setTimeout(() => {
        throttleTimeout = null;

        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            if (checkForAd()) {
              skipAhead(videoAd, 20);

              if (!enlargeSkipButton()) {
                console.warn("Could not enlarge skip button");
              }
              console.log("Worked!!");
            }
          }
        }
      }, throttleDelay);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
if (document.body) {
  startObserver();
} else {
  window.addEventListener("DOMContentLoaded", startObserver);
}
