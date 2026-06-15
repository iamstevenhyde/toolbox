# The Toolbox

A public catalog of AI-era teaching activities, cases, and games for business courses, by Steven Hyde, Boise State University.

Live site: https://iamstevenhyde.github.io/toolbox/

The Toolbox collects classroom-tested AI activities, simulations, bots, and live cases from strategy courses at Boise State. Every item is grounded in real research or real events. Take what is useful.

## Redeploy

To rebuild and publish:

1. Run `deploy.ps1` from `C:\Users\User\Desktop\Toolbox\` to regenerate `_site\`.
2. From the `_site\` directory, run:

`
git add .
git commit -m "deploy: rebuild site"
git push
`

GitHub Pages serves from the root of the `gh-pages` branch (or `main`, depending on repo settings).