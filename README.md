# COMP3120: Advanced Web Development
## Assignment 2
### Fuel Tracking Web Applciation

<p align="center">
  <img width="500px" src="public/fuel.png">
</p>

A Web Application that allows users of NSW to view fuel prices near their area!


This project contains both the frontend and backend code for our Fuel Tracking Web Application. This entire project was created as an assignment for the unit COMP3120: Advanced Web Development. The project was built using [React JS](https://reactjs.org/).



### Repository Structure

    ├── public        ├── favicon.ico
    ├			      ├── fuel.png
	├			      ├── header-splash.jpg
	├ 			      ├── index.html
	├			      ├── logo192.png
 	├			      ├── logo512.png
	├			      ├── manifest.json
	├			      └── robots.txt
	├
	├── SCREENSHOTS   ├── Wireframes
	├                 ├── DashboardPage.JPG
	├                 ├── MapPage.JPG
	├                 ├── StationsPage.JPG
	├
    ├── server        ├── controllers         ├── api.js
    ├                                         ├── appApi.js
    ├                                         ├── fuelApi.js
	├                                         └── userApi.js	
	├
    ├                 ├── models			  ├── graph.js
    ├                                         ├── metrics.js
    ├                                         ├── prices.js
    ├                                         ├── stations.js
    ├                                         └── users.js
	├
	├                 ├── tests			  	  ├── app.test.js
	├
    ├                 ├── utils				  ├── middleware.js
    ├                                         └── statistics.js
	├
	├                 ├── app.js
	├                 ├── sample.json
	├                 └── server.js
    ├
    ├
    ├── src           ├── components          ├── Bookmark.js
    ├                                         ├── Dashboard.js
	├                                         ├── Dashboard.tests.js
	├                                         ├── FuelGraph.js
	├                                         ├── Map.js
	├                                         ├── MapContainer.js
	├                                         ├── MetricCard.js
	├                                         ├── Navigation.js
	├                                         ├── Pin.js
	├                                         ├── StationInfoCard.js
	├                                         ├── StationList.js
	├                                         ├── StationListItem.js
	├                                         └── StationTable.js              
    ├
    ├                 ├── pages               ├── GraphPage.js
    ├                                         └── StationInfoPage.js
    ├
	├                 ├── reducers            ├── userReducer.js
	├
	├                 ├── sass                ├── _variables.scss
    ├                                         └── App.scss
	├
	├                 ├── services            ├── price.js
    ├                                         ├── station.tests.js
	├                                         ├── station.js
	├                                         └── user.js
	├
	├                 ├── utils               ├── Helpers.js
    ├                                         └── Layers.js
	├
    ├                 ├── App.js
    ├                 ├── App.test.js
    ├                 ├── index.js
    ├                 ├── reportWebVitals.js
    ├                 ├── setupTests.js
    ├                 └── store.js
    ├             
    ├── .eslintignore
    ├── .eslintrc.js
    ├── .gitignore
	├── craco.config.js
	├── DEPLOYMENT.md
    ├── LICENSE
    ├── package.json
    ├── Procfile
    ├── README.md
    └── yarn.lock
   
   


### Libraries
| Package name                                  | Description                                                                                                                                                                                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`react`](https://reactjs.org/)  | A JavaScript library for building user interfaces. |
| [`react-router-dom`](https://github.com/remix-run/react-router)     | React Library that allows for dynamic routing. |
| [`react-dom`](https://reactjs.org/docs/react-dom.html)    | A package that provides DOM-specific methods that can be used at the top level of an app. |
| [`react-bootstrap`](https://react-bootstrap.github.io/)    | Popular frontend framework. |
| [`axios`](https://axios-http.com/)    | A simple promise based HTTP client for the browser and node.js. |
| [`react-markdown`](https://github.com/remarkjs/react-markdown)    | Markdown component for React using remark. |
| [`express`](http://expressjs.com/)    | A minimal and flexible Node.js web application framework. |
| [`cors`](https://github.com/expressjs/cors)    | A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| [`auth0-react`](https://auth0.com/)    | Third-party authentication and authorization platform. |
| [`react-map-gl-geocoder`](https://www.npmjs.com/package/react-map-gl-geocoder)    | React wrapper for mapbox-gl-geocoder for use with react-map-gl. |

TBD

### Project Status

The project is currently under development. Deployment of the web application will be done shortly.

### Custom Components

[Dashboard](src/components/Dashboard.js)

[Map](src/components/Map.js)

[MapContainer](src/components/MapContainer.js)

[MetricCard](src/components/MetricCard.js)

[Navigation](src/components/Navigation.js)

[StationTable](src/components/StationTable.js)



### Screens

[GraphPage](src/components/GraphPage.js)

### Team Members

[Flynn Tesoriero](https://github.com/Flynntes)

[Nipun Shrestha](https://github.com/nipunshrestha)

[Trideep Lal Das](https://github.com/TrideepLD)

[Hubert Hartan](https://github.com/HubertHartan)
