# Karela

Karela is a web app for saving and sharing recipes. It makes searching easy by using ingredients and tags as filters. Users can log in to create their own recipes, unregistered users can view and search all.

## Features

- Login and Register
- Recipe search by ingredient, name or tag
- CRUD on recipes for logged in users

## Installation Guide

You will need to clone the [backend](https://github.com/nenuphars/Recipes-backend) and frontend repos for this app.

### Run locally
1. Set up the .env file on the root level of the app
```
VITE_API_URL = http://localhost:${PORT}
TOKEN SECRET = your-secure-token-secret
```

2. Choose a port for the frontend to run on and generate a secure token secret. Exchange on the .env.example and rename it to .env

3. Run `npm install` on the terminal (make sure you are in the location of /Recipes-frontend)

4. Now you can run the app with `npm run dev` (backend needs to be running as well)


## Improvements and Fixes

- [x] New Styling and layout
- [x] Error messages on Login Page
- [x] Custom backend
- [x] Error handling and form validation for recipes
- [x] Responsive Navigation Bar

## Future Features

- [ ] Comment section on recipes
- [ ] Add and remove favourite recipes
- [ ] Create a group with your friends and family in order to keep up with their recipes

## Technologies used

- Typescript
- React
- Vite
