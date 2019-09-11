# html5-material-pwa-boilerplate

Pure *Html5 Boilerplate* w/ 
- [x] Material icon css
- [x] Material components used w/ flex
- [x] basic PWA capabilities
- [x] scss w/ npm to css generation
- [x] Tiles capabilities in internet explorer
- [x] optimized normalizer instead of css resets or normalizer
- [x] add to home screen in safari browser
- [x] add to home screen in chrome browser for android
- [x] firebase hosting deployment
- [x] customize Material Theming (typography, shape and color)

This can be used for **static html* parts of an angular material app. So It will be SEO friendly due to separating www and web-app parts.

## How to start

After fork, 

1. Get packages: such as to generate scss-2-css w/ node-sass
    - `npm install`
        - webpack: **Bundles Sass and JavaScript, Builds html etc.**
            - webpack-dev-server: Development server
            - sass-loader: Loads a Sass file and compiles it to CSS
            - node-sass: Provides binding for Node.js to Sass, peer dependency to sass-loader
            - css-loader: Resolves CSS @import and url() paths
            - extract-loader: Extracts the CSS into a .css file
            - file-loader: Serves the .css file as a public URL
        - webpack plugins
            - html-webpack-plugin: **generate index.html**
            - copy-webpack-plugin: **copy files under dist/ folder**
            - workbox-webpack-plugin: **generate service-worker.js using workbox-config.js**.
        - in order to add **vendor specific styles**
            - autoprefixer: Parses CSS and adds vendor prefixes to CSS rules
            - postcss-loader: Loader for Webpack used in conjunction with autoprefixer
        - material-components-web: to **customize material theming**
        - babel: **bundle ES2015 into standart JS**
            - @babel/core
            - babel-loader: Compiles JavaScript files using babel
            - @babel/preset-env: Preset for compiling es2015
    - `npm install -g workbox-cli`, then `workbox generateSW workbox-config.js` to update service-worker.js locally. [Read more](https://developers.google.com/web/tools/workbox/modules/workbox-cli)


## How to Customize

1. Use `material.theme.scss` to change variables w/ your colors, shape requirements etc.
2. Prepare assets
   - get a transparent logo: https://onlinepngtools.com/create-transparent-png
   - then, generate all icons: https://realfavicongenerator.net/ or use their cli `npm install -g cli-real-favicon`
   - then, generate apple splash screens: https://appsco.pe/developer/splash-screens
2. then, start changing index.html and creating new html files if needed!

- webpack.config.js: webpack configuration for scss-2-css, es2015js-2-js, copy some files, generate html files etc...
- style.scss: contains all .scss files, and imports below scss files. Webpack converts it and all other scss-2-css into **bundle.css**
    - material.theme.scss: all global variables to change material design look and feel. (colors, shapes etc.)
    - normalize.scss: to reset browser specific css things. optimized version of `npm install normalizer`.
    - material.layout.scss: specific to the layout
    - material.components.scss : specific to the material components
- main.js: access components w/ `querySelectorAll('.className')` then do whatever you want!. Webpack converts it into **bundle.js**
    - It has, routing table for dev, release, demo and prod redirections. So change w/ your own urls. And here, naming is critical. It parses domainNames to route.
- icons : `npm install -g cli-real-favicon` to generate all favicons for ms, ios, android. You just need 1 high resolution transparent .png file
    - logo-transparent.png **master png file**
    - favicon-description.json : parameters for favicon generation. Change w/ your values
    - `favicon-description-generate.sh` : generation script. creates `.xyz` folder and all images. Copy them manually to related paths!
    - assets/icons/*.png
    - favicon*
    - apple-touch*
- dist/: `npm run build` creates for deployments. Then `copy-webpack-plugin` to copy some files into it. This part is critical for firbase, cause it need to see 404.html and index.html and related files to them!
    - bundle.js
    - bundle.css

## How to Run

- for development only and serve from local run `npm run start`
- for production, `npm run build` to create dist/ folder. Then deploy it to firebase w/ `./deploy-to-` scripts or somewhere else

## How to Deploy

to deploy **Firebase**: 2 files are critical. `firebase init` creates them. **You should customize them too**.

- .firebaserc: configurations about targets, firebase projects ids, and hostings. In a real scenario, you have more than one web sites in a hosting. 
- firebase.json: Deployment config to firebase
- deployment-to-development.sh, deployment-to-release.sh, deployment-to-demo.sh, deployment-to-production.sh: To decrease deployment risks such as firebase users, projects and related websites etc..
    - In a ci/cd scenario, you will use some parts of scripts to handle more elegant way !

**general architecture** will be similar to below:

- The _branches_ will be dev, release, demo, prod
- then, your _firebase architecturee_ will be, 
    - for the main part will cover dev (dev-13df7), release (release-15dx7), demo (demo-3f567), prod (prod-4fg56)
        - Above have 1 hosting w/ multiple websites + default firestore db + same Authentication + GA enabled
        - blaze pricing tier for gcp access
    - in a microservices scenario, you gonna need separate projects dedicated to dbs
        - i.e. merchandiser-dev, merchandiser-release, merchandiser-demo, merchandiser-prod
        - merchandiser's app or www is inside dev, release, demo and prod !!
- So then, your _GCP_ structure will be under 1 billing account w/ 1 organization
    - dev, release, demo, prod as gcp projects.
    - if you delete firebase project, gcp part, default behaviour, will be deleted !
- So then, your _GA_ structure will be under 1 account
    - dev, release, demo, prod as _properties_ and _all web sites view_ inside.
    - in GA, correct namings. They will have same ids in firebase.


1. Install Firebase CLI w/ `npm install -g firebase-tools`
2. `firebase login` to **switch firebase user**. or `firebase logout` to change firebase user.
    - `firebase list` to see _firebase projects_
    - then, `firebase init` to initialize firebase settings w/ hosting, public=./dist, no route to index.html, no overwrite 404.html, no overwrite index.html<br>
3. In a real scenario you will have dev, release, prod, demo stages. And i.e. in dev (as firebase project), you will have 1 hosting which contains 2 apps such as www (static parts) and core-app (dynamic parts).<br><br>
So you should consider:
    - **every links in www** must be redirected correct core-app urls, regarding to stages of core-app !
    - **deployment of www** must be routed to correct project and correct hosting app ! 
4. **Copy and edit .firebaserc, firebase.json files.** Basicly, below steps are...
    - Do not add `site: ...` to the firebase.json. Instead, Use `target: ...` !
    - Add `index.html` firebase js before </body>
    - Run `firebase use --add`, for all projects in related firebase account ! This will define alias for `--project ...`. So you can use easily
    - Run `firebase deploy --project development --only hosting:...`
    - for local test use `firebase serve`.

## About Fork strategy

Once you forked, do your customizations and manually get changes from [upstream](https://github.com/tansudasli/html5-material-pwa-boilerplate).
