# Eight Track

## Overview

[Eight Track](https://eight-track-app.herokuapp.com) is a clone of SoundCloud, a music sharing app. Users are able to upload music, which is freely available for others to listen to.


## Technologies Used

- [PostgreSQL](https://www.postgresql.org/docs/current/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [React](https://reactjs.org/)
- [Redux](https://react-redux.js.org/)
- [Node.js](https://nodejs.org/)
---
- [react-h5-audio-player](https://www.npmjs.com/package/react-h5-audio-player)
- [wavesurfer.js](http://wavesurfer-js.org/docs/)
- [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)
- [ColorThief](https://github.com/fengsp/color-thief-py)
- [AWS S3](https://aws.amazon.com/s3)
- [AWS CloudFront](https://aws.amazon.com/cloudfront/)
## Features
 ### Splash Screen
![splash-screen](https://user-images.githubusercontent.com/61633951/155901264-c246fd19-e148-4d33-bb1a-f865daa832c9.png)


### Song Detail

![player-waveform](https://user-images.githubusercontent.com/61633951/155901543-1ffe7bc3-a1a0-4033-b75e-667c3dc656b7.png)

The song detail page displays a waveform that represents the audio levels of the song during it's playtime, as well as an indicator of the current song playtime location the song if the player is currently playing that song.

### Comments

When a user is signed in, they can make comments about any song, and if the song being commented on is currently playing, the current time of the song is logged. This allows users to be able to make a comment about a specific moment in the song.

## Song Upload


A user who is signed in is given the opportunity to upload music either by dragging a file from their gui onto the dropzone or using the file input element and selecting a song to upload.

![song-upload-eight-track](https://user-images.githubusercontent.com/61633951/164092306-3a365789-c192-4edc-8878-440150fdbea4.png)

Once the song has been loaded. the user is able to select a title, artist name, image, genre, and description of the song, and upload the song and create a row in the database with the relevant information.


