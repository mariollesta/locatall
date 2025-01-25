# Release Notes - Version 0.2.0

## Features

- Immutable Title Language.

- Link to Github project.

- Error Messages UI.

## Improvements

- Change font app by logo font -> Poppins.


## Minor Version Changes

### v-0.2.3

**Features**

The recommender now search by more types of places:
    - Restaurant
    - Bar
    - Cafe

**Fixes**

Fixed url api address.

### v-0.2.2

**Improvements**

Add allowed origins to the api.

### v-0.2.1

**Features**

Geolocation errors handling.

**Improvements**

Code refactoring:
    - Separate status and logic in different files.
    - Extract auxiliary functions.
    - Use useCallback for handleFindPlace and handleReset functions to avoid recreating them on each rendering.
    - Use useMemo to calculate values that do not change unless their dependencies do, such as distanceOptions.

**Fixes**

Last result was highlighted when searching.
