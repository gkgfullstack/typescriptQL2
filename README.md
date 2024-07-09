This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

This project uses FontAwesome Pro version npm package.
You need to set up auth token before run npm install.

FONTAWESOME_NPM_AUTH_TOKEN - token for install FontAwesome icons.

Run locally:
Please set token value into 'FONTAWESOME_NPM_AUTH_TOKEN' in .pre-install-env and run `source .pre-install-env`. Only after that you can run  `npm install`<br />
Please do not commit that value for secure reason!

Run on prod envs:
Variable should be set up as a beanstalk environment variable.<br />

More(https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers)

## Build Process

If the branch you want to build, test, and deploy is neither staging nor master, run the [cc-react-build-and-deploy](http://jenkins.ql2.com:8080/job/client-center/job/cc-react-build-and-deploy/build?delay=0sec) job. You must provide the branch of the project you want to deploy and then check the box(es) for which environment(s) you want to deploy the build to. The version of the build will become "{branch_name}-{jenkins_build_number}".

If the branch you want to build, test, and deploy **is** staging or master, then the pipelines that will be automatically started upon any push commits to the remote bitbucket repo are here: [staging pipeline](http://jenkins.ql2.com:8080/job/client-center/job/cc-react-antdesign-pipeline/job/staging/) ... [master pipeline](http://jenkins.ql2.com:8080/job/client-center/job/cc-react-antdesign-pipeline/job/master/). As stated previously, all you need to do is push your commits to the remote branch and these Jenkins pipelines will automatically start. If they don't start immediately, you may have to wait up to 5 minutes, as that is the branch indexer's time interval. For master branch builds, someone must manually deploy them to elastic beanstalk via the AWS UI. [Prod environment in elastic beanstalk](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/environment/dashboard?applicationName=client-center-react&environmentId=e-bsjskeewap)

If you have any questions regarding the build steps, do not hesitate to contact Patrick Miller (pmiller@ql2.com).

Endpoints for our environments:

* [alpha-india-dashboard.ql2.com](http://alpha-india-dashboard.ql2.com/)
* [alpha-minsk-dashboard.ql2.com](http://alpha-minsk-dashboard.ql2.com/)
* [staging-dashboard.ql2.com](http://staging-dashboard.ql2.com/)
* [nutmeg-dashboard.ql2.com](http://nutmeg-dashboard.ql2.com/)
* [live-dashboard.ql2.com](http://live-dashboard.ql2.com/) ... aka "prod"

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Project structure

### Application color palette

The main color palette is defined in `src/colors.less` file. Please use colors variables everywhere where you need to add color.
If you do not find color in the provided list it depends on business/ux needs.
If the difference is small please use similar color variable as already defined in palette.
If there is any business/ux reason to use color that is not defined in palette please use it only in your component.

### Icons

For displaying icons we use FontAwesome Pro library. Please follow the install process that is described bellow.
Icon set that is used in application is defined as library in `src/setupIcons.ts` file.
Please do not create duplicates in this library. Use what already exist if you need add some new icon please follow the rules of their definition.

#### Component usage
```
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
```
Pay your attention that you should indicate correct icon package.

 * fas - solid
 * far - reqular
 * fal - light

Icon name and name of package of the appropriate icon you can find here https://fontawesome.com/icons?d=gallery.

### UI framework

Ant design is used as a UI framework (https://ant.design/). Some of the components are already styled via less variables that framework uses.
You can find it in `src/cc-ant-design-theme.less`
Ant variables that you can override you can find here https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

In some cases ant do not provide such variables to override default styles so you have to override css rules.
If the changes are global and should be applied for all component instances please put your override rules into src/index.less file.
If not, please put it in .module.less file that is related to your component where ant component is used.
Also if your ant component changes that are not related to styles but related to values of component properties and should be applied to all or most ant-component instances than you can create component wrapper where you can define that default properties and use it.
As an example Select and Modal components. Please use it.
Components are located in common folder.
`src/components/common/Select`
`src/components/common/Modal`


### Requests

Axios is used for fetching remote data.
Please use appropriate axios instance for any requests. You can find it in `src/api/axiosInstances`

