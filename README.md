# koala-holla-group

## TODO
- [x] Create a database `koala_holla`
- [x] Create a table `koalas`
    - [x] Create structure, export file as database.sql
- [x] Import client data
- [x] Create web app - Base mode
    - [x] Displays Koalas
    - [x] Add Koalas

### Initialization/Setup
- [x] Setup files, client side and server side
- [x] Node install, package.json
    - [x] `npm install jquery pg express body-parser --save`
- [x] Initialize server
- [x] Establish routes directory and setup
- [x] Create modules/pool file
- [x] Add pg and pool consts

### DOM
- [x] Basic DOM input/display setup

### Displaying Koalas
- [x] GET (client side and routes) koalas data from database
- [x] Display on DOM

### Adding Koalas
- [x] POST (client side and routes) koalas to the database
- [x] Update DOM with new koalas

## HARD MODE 
- [x] Ready to Transfer button to update status
    -  [x] Client - button for only "No" on Ready to Transfer
        - [x] When clicked, PUT request to change `ready_to_transfer` to "Yes" 
    - [x] Routes - matching PUT to update database
- [x] Add Delete option to Koala row
    - [x] Client - button for "Delete" for each koala
        - [x] When clicked, DELETE request to remove from database
    - [x] Routes - matching DELETE to update database
- [x] Bootstrap the things

## PRO MODE
- [x] Edit information for existing koalas
    - [x] Client side - Edit button that converts list elements to input elements with `value` equal to that elements text
    - [x] Add a submit button
        - [x] On submit, PUT request to update database
    - [x] Do the buttons things (hide/show)
- [ ] Toggle Display of Ready to Transfer