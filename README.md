# Fractal Website

![Node.js CI](https://github.com/fractalcomputers/website/workflows/Node.js%20CI/badge.svg)

This repository contains the code for the Fractal website where users create and manage their account. It interfaces with the webservers and the admin dashboard.

The Netlify staging version of the website is hosted [here](https://fractalcomputers.netlify.com/).

## Development

The admin dashboard is developed using the `npm` package manager. You can start developing by running `npm install`, and can launch into a localhost via `npm start`.

If you need to update dependencies, you can run `npm upgrade`, followed by `npm prune` to remove unnecessary dependencies.

Note that the `master` branch autodeploys to `fractalcomputers.com` and should only be pushed to when code has been properly tested. The `staging` branch autodeploys to `fractalcomputers.netlify.com` and is the recommended branch to branch from when working on a feature, and the branch to PR into.

Basic continuous integration is set up for this project. For every push or PR, basic NodeJS tests will be compiled and run within GitHub Actions. This will also auto-format the code via Prettier, see below. You should make sure that every push to master passes the build in GitHub Actions.

## Styling

To ensure that code formatting is standardized, and to minimize clutter in the commits, you should set up styling with [Prettier](https://prettier.io/) before making any PRs. You may find a variety of tutorial online for your personal setup. This README covers how to set it up on VSCode.

You can always run Prettier directly from a terminal via `npm run format`.

### [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install esbenp.prettier-vscode
```

To ensure that this extension is used over other extensions you may have installed, be sure to set it as the default formatter in your VS Code settings. This setting can be set for all languages or by a specific language.

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
