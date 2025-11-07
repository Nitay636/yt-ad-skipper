# yt-ad-skipper

**yt-ad-skipper** is a lightweight browser extension/script designed to automatically skip YouTube ads, including skippable video ads and banner ads, to improve your viewing experience.

## 🚀 Features

- Detects and skips skippable video ads.
- Removes banner ads and overlays.
- Works automatically in the background.
- Minimal permissions required.
- Designed for performance and reliability.

## 🛠️ How It Works

The script uses a `MutationObserver` to monitor changes in the DOM, specifically for the appearance of ads and skip buttons on YouTube. When a skippable ad is detected, it either:

- Clicks the "Skip Ad" button as soon as it's available, or
- Advances the video 10 seconds forward to skip the ad content.

It also removes ad banners or overlay ads that interrupt the video.

## 📦 Installation

### As a Browser Extension (Manual)

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/yt-ad-skipper.git
   ```
