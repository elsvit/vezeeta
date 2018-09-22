# Developing flow

## Branch names

- `release/v1.x.x` when working on a release build
- `feature/user-signup` when  working on a task from VSTS board or adding a new feature
- `fix/issue` when fixing and issue but it’s not on production
- `hotfix/issue` when fixing an issue in production

## Main branches

- `master` Always have the latest version that running on the production
- `develop` Having the next release code

## Commit message

**See:** <https://github.com/erlang/otp/wiki/writing-good-commit-messages/>
Use present simple and start with a capital letter. Make it descriptive under 50 character as `Add onChange prop to Button component`

## Workflow

**See:** <https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/> *(We are using the flow itself not the package)*

- Create a branch from `develop` and name it as in `Branch names` section
- Commit each feature or related code in a single commit and see `Commit message` section
- Update package version as `Build version` section and update the changelog as well
- Push your code to the remote and create a pull request with `develop` branch
  - If you are working on package repository make the PR with `next` branch

## Build version

- `1.x.x` when releasing a major update to the production
- `x.1.x` when adding a new feature
- `x.x.1` when fixing a bug or enhancing a small feature
  - `x.x.1-rc.revision-number` Add `rc` to the end of the version if you are working on a beta package release like `2.0.1-rc.1` that’s mean that it’s the first revision of the beta version
