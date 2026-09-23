# Van's Builder Assistant

A free desktop app for people building a Van's kit plane: import the construction manuals, track every
step, keep notes, ask an AI assistant about a step or a drawing, and search all of it. Your manuals,
progress and notes stay on your computer. The RV-12iS is supported today; other models will follow based
on interest.

**Website and downloads:** https://vansbuilderassistant.net

## This repository

Releases of the app, and the website.

- **Releases** hold the installers: macOS DMGs for Apple silicon and Intel (signed and notarized), and a
  Windows installer. The zips and `latest*.yml` files are for the in-app updater.
- **`docs/`** is the website, served by GitHub Pages. `.github/workflows/homepage.yml` rewrites its version,
  date and download links whenever a release is published.

The source code lives in a private repository.

## Requirements

- macOS 12 or later, or Windows 10/11 (64-bit).
- The construction manual PDFs from Van's Aircraft; they are not included.
- For the Ask feature only: an [Anthropic API key](https://platform.claude.com/docs/en/get-api-key), entered in Settings.

## Feedback

Bugs, questions and requests for other models: open an [issue](../../issues) here, or find
[ymc9 on VAF](https://vansairforce.net/members/ymc9.37658/).

Van's Builder Assistant is a hobby project by one builder, provided as is and without warranty of any
kind; the creator assumes no liability for its use. It is not affiliated with Van's Aircraft, Inc.
