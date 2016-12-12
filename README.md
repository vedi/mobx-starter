# React + Mobx Quick Starter project

The goal of this project is to provide a starting base for an isomorphic (universal) mobx react project.

Features:
+ `async/await` support
+ Isomorphic
+ CSS and SCSS compilation
+ MongoDB user register/login/logout
+ Token based authentication
+ Decorators for accessing actions and state
+ Hot reload
+ Automatic restarts _(when server code changes)_


![Preview](https://raw.githubusercontent.com/nightwolfz/mobx-starter/master/preview.png)


## How to run

For development:

    npm run dev

For production:

    npm run prod

## Requirements

    Node 6+ or Node 4 with additional babel plugins
    MongoDB server

## Goals

- Optimized for minimal bundle size.
- Optimized for server-side speed.
- Using MobX, the easiest and insanely fast state manager.
- Simple and minimal with routing, authentication, database and server-side rendering.
- Good developer experience with hot-reloading and source-maps.


# Benchmarks

```sh
gb -G=4 -k=true -c 200 -n 10000 http://localhost:2000/about

Document Path:          /page/about
Document Length:        1374 bytes

Concurrency Level:      200
Time taken for tests:   26.03 seconds
Complete requests:      10000
Failed requests:        0
HTML transferred:       13740000 bytes
Requests per second:    384.16 [#/sec] (mean)
Time per request:       520.620 [ms] (mean)
Time per request:       2.603 [ms] (mean, across all concurrent requests)
HTML Transfer rate:     515.42 [Kbytes/sec] received

Connection Times (ms)
              min       mean[+/-sd]     median  max
Total:        66        2   52.84       503     783
```
Tested on i7-6700K @ 4.00GHz 16GB RAM. **Single** node.js instance.

# F.A.Q.

## What are `stores` ?

Stores will contain the state of your application and the methods that mutate that state.
Basically most of your client side logic is inside stores.


## What is `@inject()` and `@observer` ?

The `@inject` decorator injects stores into your components.
Additionally by adding `@observer` your components will efficiently auto update with any changes to your stores.

_Example: If you display a `messageCount` from a `Messages` store and it gets updated,
then all the visible components that display that `messageCount` will update themselves._


## Does observing many components make my app slower?

**No**, it actually allows the rendering to be done more efficiently. So observe as many as you want !


## Adding database (mongodb) models

1. Goto `src/server/models`
2. Add `[Name].js` with your model in it

## Adding stores

1. Goto `src/client/stores`
2. Add `[name].js` (based on another store like `account.js`)
3. Update `src/client/stores.js`

## Enabling server-side rendering

1. Goto `src/server/config`
2. Set `server.SSR` variable to `true` or `false`

## My components are not updating!

Make sure you added the `@observer` decorator to your component.

## My stateless component doesn't have access to the stores !

You cannot use decorators on stateless components.
You should instead wrap your component like this:

```js
const MyComponent = inject('myStore')(observer((props, context) => {
  return <p>{props.myStore.something} !</p>
}))
````

## How do I execute async actions on the server and/or client ?

Add a static `onEnter` method to your component like this:

```js
class MyComponent extends React.Component {
    static onEnter({ myStore, params }) {
        // Make sure to ALWAYS returns something (preferably a promise), even if its nothing!
        // Otherwise we won't know when the method finished it's work
        return myStore.browse()
    }
    // ...
}
```

The `onEnter` method is smart, it will be executed either on the server or on the browser depending on how you access the website.

It also passes all your stores and url params as arguments as a convenience.

## How it works (server)

1. `index.js` initializes the logger, generates a webpack bundle and runs the server

2. The server runs a bunch of middleware:

    1. `context.js` creates your initial state based on your stores defined in `src/client/stores.js`
    2. `catcher.js` catches and handles any errors that might occur in your routes.
    3. `authorize.js` checks if you are logged in and have access to protected routes.
    4. `render.js` finally renders your components.
    
3. `server.js` also imports the routes from `server/routes` where each route can use a database model defined in `server/models`.
Just adding a model file there is enough, we initialize the models lazily when they are used.

## How it works (prefetching data on the server)

Our `client/preload.js` will execute static methods on components when a certain url pattern is matched.
The supported URL patterns are same as react-routers, you have have variables routes and wildcard matches.
Ex: `/profile/:username/overview`

## How it works (client)

1. `client.js` initializes the stores, hot-reloading and other helpers. 
2. It hydrates the state we got from the server and renders `pages/App.js`
3. `pages/App.js` is basically your entry point. What you do afterwards is up to you!

## TODO

* Initialize the routes automatically just like the models
* Sync with changes from `inferno-starter` which is usually more up to date

## Useful links

[MobX](https://mobxjs.github.io/mobx/)


## Author

Ryan Megidov

https://github.com/nightwolfz/mobx-starter
