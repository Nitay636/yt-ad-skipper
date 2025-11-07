function checkForAd(videoAd) {
  // Check if the ad is visible
  if (
    videoAd &&
    videoAd.offsetParent !== null && // element is not `display: none`
    videoAd.getBoundingClientRect().height > 0 // element takes up space
  ) {
    return true;
  }
  return false;
}

function skipAd() {
  console.log("Attempting to skip ad...");
  const skipButton =
    document.querySelector(".ytp-skip-ad-button") ||
    document.querySelector("#ytp-skip-ad-button");

  if (skipButton) {
    console.log("Skip button");
    skipButton.click();
  }
}

function enlargeSkipButton() {
  // Enlarge the skip button to make it more clickable, but not block the player
  const skipButton =
    document.querySelector(".ytp-skip-ad-button") ||
    document.querySelector("#ytp-skip-ad-button");

  if (!skipButton) {
    console.warn("Skip button not found");
    return false;
  }
  if (skipButton && skipButton.offsetParent !== null) {
    // Only slightly increase size and z-index
    skipButton.style.setProperty("display", "block", "important");
    skipButton.style.transform = "scale(1.5)";
    skipButton.style.zIndex = "9999";
    skipButton.style.opacity = "1";
    // Remove pointerEvents and absolute positioning
  }
  return true;
}

function skipAhead(videoAd, seconds = 20) {
  try {
    const target = Math.min(
      video.duration || Infinity,
      video.currentTime + seconds
    );
    video.currentTime = target;
    console.log(`Skipped ahead ${seconds} seconds`);
    return true;
  } catch (e) {
    console.error("Failed to skip ahead:", e);
    return false;
  }
}

function startObserver() {
  if (location.hostname === "www.youtube.com") {
    let throttleTimeout;
    const throttleDelay = 100; // 100 ms
    const observer = new MutationObserver((mutations) => {
      if (throttleTimeout) return; // Skip if already waiting
      throttleTimeout = window.setTimeout(() => {
        throttleTimeout = null;

        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            const videoAd = document.querySelector(
              ".video-stream.html5-main-video"
            );
            if (checkForAd(videoAd)) {
              skipAd(videoAd);
              // If enlargeSkipButton can't find a skip button, jump the video 20s forward
              if (!enlargeSkipButton()) {
                skipAhead(videoAd, 20);
              }
            } else if (!checkForAd(videoAd)) {
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
