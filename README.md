# BiteBuddy

Discover the best nearby restaurants with this web app. Find the perfect dining option using filters like price range and menu options. Get essential information like location, reviews, and ratings, all in one place. It's the easiest way to find your new favorite restaurant!

## Languages/Frameworks used

- The frontend is made with `ReactJS` with `ts` template
- The backend is made with `Golang` with `Gin`, `GORM` and `Air`
- The database is made with `SQLite3`
- The api is amde with `RESTful API`
- Token generation and parsing using `JWT`

## Run the project

Run the frontend as well as backend concurrently. You need to have `yarn` and `go` in your system.

### How to run the backend

```
cd server
go run main.go
```

Command to run server using Air (for Live reloading):

```
cd server
air
```

### How to run the frontend

Make sure to first install all the dependencies:

```
cd client
yarn install
```

Now run:

```
cd client
yarn dev
```

### Filters API

- /?name={name} EMPTY
- /?sort={name} EMPTY
- /?order=ASC DSC EMPTY
- /?veg=true EMPTY
- /?lat=60
- /?long=40
- /?rating={1,2,3,4,5,EMPTY}

### Link to presentation

<a href="https://www.canva.com/design/DAFg_WyyQKw/NllMnM6n2KCU2HxB6iXcKw/view?utm_content=DAFg_WyyQKw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink">Presentation Link</a>
# BiteBuddy
