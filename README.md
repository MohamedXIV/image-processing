# Image processing API

## Table of Contents
- [Image processing API](#image-processing-api)
  - [Table of Contents](#table-of-contents)
  - [NPM Scripts](#npm-scripts)
  - [Routes](#routes)
    - [resize](#resize)
  - [Notes](#notes)



## NPM Scripts
`build` to build run `npm run build`

`start` to start run `npm run start`

`test` to test run `npm run test`

## Routes
  ### resize
    /api/resize?imageName=image&width=300&height=300

## Notes
  1. Please Do not delete the containing folder that is named after the image, as the app checks after it to see if the image exists, also the case for the image.
  2. The generated images are saved under the same folder and named with appended width, height, or both.