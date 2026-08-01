# Web Test

A small static website for testing browsers and operating systems, including older environments.

## Purpose

This project provides one simple website that can be opened from many kinds of environments, such as current browsers, old desktop operating systems, virtual machines, emulators, and low-spec devices.

It is intended for checking whether an environment can:

- connect to a web server
- resolve and load pages correctly
- display basic HTML and CSS
- run simple JavaScript
- submit forms and handle text encoding
- display JPEG, PNG, GIF, and favicon images
- run small browser games

The site deliberately avoids frameworks, build tools, CDNs, web fonts, and other external dependencies. Its pages use conservative web technology so that modern browsers look reasonably clean while older browsers can still display and use the essential content.

## Contents

- Basic HTML, CSS, JavaScript, form, encoding, and image tests
- JPEG, PNG, GIF, and favicon checks
- Snake, Memory, and Reaction Time mini-games
- No build step, package manager, framework, CDN, or external dependency

## Deploy to Vercel

1. Create a GitHub repository named `web-test`.
2. Upload all files from this folder to the repository root.
3. Import the repository into Vercel.
4. Select **Other** as the framework preset and leave the build settings empty.

The included `vercel.json` serves the project as a static site.

## Run locally

```sh
python -m http.server 8080
```

Open:

```text
http://localhost:8080/
```

For a QEMU guest using user-mode networking, the host is commonly reachable at:

```text
http://10.0.2.2:8080/
```

Running it locally over plain HTTP is useful for old browsers that cannot connect to current HTTPS/TLS servers.

## Compatibility

The main pages intentionally use conservative HTML, CSS, and JavaScript. Modern browsers receive a cleaner presentation, while older browsers can ignore unsupported decoration and still display the content.

## License

This project is licensed under the [MIT License](LICENSE).
