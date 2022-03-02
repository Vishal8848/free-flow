# Freeflow

A user-first social media platform dedicated for interpersonal communication. This app allows people to interact with each other with the goal of keeping them connected across :iphone: devices and :earth_asia: geographical origins. 
Don't hesitate to have a look at [Freeflow](https://free-flow-vp.web.app).
To have a standalone application, download and install the APK named **Freeflow.apk** from the release section

## :fire: Features

- **Feed:** Create posts, like, save and add comments to them. Exercise your fingers on the public chat window. Be updated with post actions made by users instantly. The trend section is reserved for the most liked post.

- **Profile:** Describe yourself. Add a profile and background picture. Enrich your profile with hobbies, location, education, etc. View your friends and shortened version of posts you created or saved.

- **Make Friends:** Search for other _Freeflow_ users and send them a friend request. Accept or acknowledge them from the notification bar(top right of header).

## :framed_picture: Samples
[Mobile Feed](/samples/mobile-feed.png) | 
[Feed](/samples/feed.png) | 
[Mobile Notification](/samples/mobile-notify.png) | 
[Standard](/samples/standard.png)

## :desktop_computer: The Stunt

This app is created using **React** and **Firebase**. This has a registered service worker and thus is a installable and fully functional PWA (Progressive Web Application).

> On a mobile? No worries. The browser instantly prompts for an `install app` button when you reach the site.

#### The React Part
- State management along with HMR (Hot Module Replacement)
- Context API does suffice the need of Redux

#### The Firebase Side
- Email and Google Provider Auth along with firm security rules
- On the go subscription based snapshot listeners for live data flow

## :sparkling_heart: Customize / Collaborate

- Clone the repo, install packages
```
git clone ...
npm init
```

- Create a firebase app and setup firebase config in .env
```
touch .env
```

- Run the app using and enjoy coding!
```
npm run start
```

#### :star: Don't forget to star this repo
