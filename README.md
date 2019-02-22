# React-Redux-Kanban
This project is a kanban board made with react and redux. Kanban boards are tools that are used to visualize projects and workflows.

# About the app

The goal of this project was to become better at handling state changes with redux. The structure of the redux state for this project is an array of column objects, with each column containing an array of card ojbects. Each column represents a stage of the workflow and each card represents a task to complete. All state changes maintain immutability adhering to redux best practices. Redux state is persisted using local storage browser API and the redux-store subscribe method.

# Technologies Used:
* React
* Redux
* redux-undo
* local storage browser API
* deep-freeze
* redux-dev-tools

# Functionality
* Ability to create, update and delete columns and cards.
* Move cards from column to column.
* Load a boilerplate project at anytime.
* Clear the project board to start a new project from scratch.
* Persist redux state with local storage.

# Beyond MVP
* Drag and drop
* Node.js backend to create and store multiple projects.
