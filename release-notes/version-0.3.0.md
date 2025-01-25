# Release Notes - Version 0.3.0

## Features

- New group of search options: search by type of place -> restaurant, cafe or bar.

- Added icons in the distance and site options.

## Improvements

- Use of asynchronous requests for Google Places api calls: 
    - Better performance: server can handle more concurrent requests.
    - Resource optimisation: It does not block the thread while waiting for a response from Google Places.

- More granular exception handling

- Endpoint code refactoring.

## Minor Version Changes

### v-0.3.1

**Features**

- Increased the furthest search distance from 10 to 15 km.

- Added bakery, meal_takeaway and meal_delivery to available search sites.
