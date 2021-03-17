# Minesweeper

This repository holds a version of the Minesweeper game built with ```Typescript```, ```Angular 11```, ```Bootstrap 4```, ```FontAwesome``` and ```SaSS```. The built bundle is served statically with a ```Express``` server.

## Installation

1. Install dependencies with npm. ```npm install```
2. Build the app. ```npm run build```
4. Serve the built bundle with Express. ```npm start```
5. Enjoy the game

## Angular routes

The app contains the following routes:
* ```/``` - Main menu
* ```/game/:gameId``` - Play the game
* ```/stats``` - Statistics of all the finished games
* ```/faq``` - Frecuently asked questions
* ```/**``` - A 404 error page

## Game CORE components

The game is developed by using some core models and their matching interfaces in order to track and manage the game state. For instance:
                               
* ```Game```: Class - Holds the game initial settings, statistics and a reference to the main ```Board```.
* ```JSONGame```: Interface - An interface to structure ```Game``` for persistence purposes.
* ```Board```: Class - Manages the CORE game logic such as creating and filling the grid with ```Cell```s, placing the bombs, counting nearby bombs, and handling moves.
* ```JSONBoard```: Interface - An interface to structure ```Board``` for persistence purposes.
* ```Cell```: Class - Holds the state of each cell. E.g. If the cell has a bomb or if it was revealed.
* ```JSONCell```: Interface - An interface to structure ```Cell``` for persistence purposes.

These models are used as a reference by 2 Angular components to render the game:

* ```GameComponent```
* ```BoardComponent ```

## Main features

#### Game saving:
The game state is persisted using an abstract service ```DatasourceService``` that resolves which connector to use in order to persist data.
Every connector implements a common interface called ```DatasourceConnector```. 
The default connector is called ```BrowserDatasourceService``` and it is browser oriented. It persists data using ```localstorage```.

#### Custom board:
The player can customize the board by choosing between 4 different levels of difficulty: ```easy```, ```medium```, ```hard``` and ```custom```. When the player selects the ```custom``` level, he is able to 
manually configure the board by selecting the grid's size ```N```x```M``` and the ```number of bombs```.
#### Active & Finished games:
The player can resume an active game by choosing it in the main menu and clicking on the ```resume``` button. Additionally, the player can view all the finished games stats and inspect a game board 
by clicking in the ```inspect``` button.

## Linting

Linting for this project is provided by TSLint, the default linter for Angular. To lint the project run ```npm run lint```

## Versioning

This repository is versioned using [SemVer (Semantic Versioning)](https://semver.org/) and commits are formatted by using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Testing

Tests are written with ```Jasmine``` and ```Karma```. At the moment there are few unit tests. Initial testing was focused on the core game components such as ```Game```, ```Board``` and ```Cell``` models.

To run all the available tests run ```npm run test```

## Author

Nahuel Vazquez [(@netishix)](https://www.github.com/netishix)
