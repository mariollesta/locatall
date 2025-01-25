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
