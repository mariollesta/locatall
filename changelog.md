# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- (Funcionalidades en las que estás trabajando)

---

## [0.5.0] - 2025-03-xx

### Added


### Fixed


---

## [0.4.0] - 2025-02-20

### Changed
- Rebranding from **Gotoeat** to **Locatall**, reflecting the app’s expansion beyond restaurants.

### Added
- New category selector, allowing filtering by categories such as entertainment, health, shopping, and more.
- Increased number of accessible places in search thanks to the new selector.
- Improved error handling for clearer and more accurate responses.

---

## [0.3.1] - 2025-01-25

### Added
- Increased the furthest search distance from 10 km to 15 km.
- Added new place types to the search options:
  - Bakery
  - Meal takeaway
  - Meal delivery

---

## [0.3.0] - 2025-01-25

### Added
- New search group options: search by place type (restaurant, cafe, or bar).
- Added icons to distance options and place type options.

### Changed
- Implemented asynchronous requests for Google Places API calls:
  - Improved performance, allowing the server to handle more concurrent requests.
  - Resource optimization: non-blocking operations while waiting for Google Places responses.
  - More granular exception handling for API requests.
- Refactored the endpoint code for better readability and maintainability.

---

## [0.2.3] - 2025-01-23

### Added
- The recommender now searches by more types of places:
  - Restaurant
  - Bar
  - Cafe

### Fixed
- Fixed API URL address.

---

## [0.2.2] - 2025-01-23

### Changed
- Added allowed origins configuration to the API.

---

## [0.2.1] - 2025-01-20

### Added
- Geolocation error handling.

### Changed
- Code refactoring:
  - Separated status and logic into different files.
  - Extracted auxiliary functions.
  - Used `useCallback` for `handleFindPlace` and `handleReset` functions to avoid recreating them on each render.
  - Used `useMemo` to calculate values that do not change unless their dependencies do, such as `distanceOptions`.

### Fixed
- Fixed issue where the last result was still highlighted when performing a new search.

---

## [0.2.0] - 2024-01-18

### Added
- Immutable app title (language independent).
- Link to the GitHub project.
- Error messages in the UI.

### Changed
- Updated app font to match logo font: Poppins.

---

## [0.1.0] - 2025-01-13

### Added
- Navbar with the app title.
- Main component: Food Recommender card.
- Three distance options available (less than 1 km, 5 km, or 10 km).
- Use the browser Geolocation API to get the user's location (if permission is granted).
- Button to search the Top 5 best-rated restaurants based on the selected location.
- Label showing whether the recommended restaurant is open or closed.
- Link to open the restaurant in Google Maps from the result.
- ‘Reset’ button to get a new recommendation.
- Footer component.
- Responsive design.

### Changed
- Reviewed and cleaned up the code.
- Prepared the backend for deployment.
- Prepared the frontend for deployment.

### Fixed
- Code optimization.
