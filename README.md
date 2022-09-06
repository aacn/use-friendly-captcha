## Module Project Template

- Use the template to create a new repository for your module
- Clone the new repository locally
- Change the following values in package.json and fill the details accordingly


          "name": "@reaction-link/<ADD MODULE NAME HERE>",
          "description": "<ADD DESCRIPTON HERE>",
          "author": "<ADD YOUR NAME AND CONTRIBUTORS>",
          "version": "1.0.0", <- adhere to semantic versioning standards (see semver.org)*,
          "repository": {
            "type": "git",
            "url": "ssh://git@github.com/reaction-link/<REPOSITORY NAME>.git"
          },


- \* https://semver.org, first public version shall be 1.0.0
- run `yarn install-all` to install all dependencies, including these for the playground app
- run `yarn prepare` for pre-commit hooks to integrate
- Start writing your code in `./src`. Optionally use `yarn generate` to leverage the templates for components, contexts, interfaces...
- When adding custom dependencies, make sure to include them in peer dependencies if needed (see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies for details) - `react` and `react-dom` are included by default
- TailwindCSS is included by default and "should just work. **Important:** Verify there are no conflicts with tailwind if you use tailwind in your depending project (where you intend to use the project) as well!
- Bundling is done with rollup after generating d.ts with typescript compiler and transpiling to es5 by default. See rollup.config.js for details
- Test your code while coding it by running `yarn dev` (enables hot reloading)
- Build your code by running `yarn build`. Your module is also exported in esm format to the playground app and can be used there. Run `yarn playground` to run the playground app to test your module within the test site.

### Write tests for your module!
In a future release, module packages without tests will fail to deploy!

## Deploying
Open a Pull Request against the `main` branch. After merging, a GitHub Action is run to deploy a new version of your module package.
