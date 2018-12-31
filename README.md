# phoenix-hope

#### Welcome to Goal do it! This web application is still in process.

#### 2019 is coming. You must already have a list of the New Year's Resolutions. Have you ever experienced the post new year slump, and cannot keep your resolutions until the next new year comes?

#### This app is helping you to reach your goal!

---

## How to set up your goals and steps

#### Don't set too many goals, It is not realistic you can stick with so many goals at one time. If you have too many goals to achieve [Here is how to prioritize your goals](http://jollyguru.com/prioritizing-goals/)

#### create a goal which is realistc that you can keep it throughout the year.

#### break it down to small steps/goals and achieve one small goal at one time.

#### Perfection is unattainable. This app will send you the auto daily text reminder and of your goal automatically with Twilio API, and when the due date of your goal is approaching.

#### Get the support from your community. Your created goals will be supported/claps from other users and some comments from other users.

---

## How to use this application

### dev prerequisites

- node v10.14.2
- npm v6.4.1
- postgres v10.5

### terminal command

- npm install - install deps
- createdb goals - create the database
- node seed.js - create tables and inssert some sample data

### Setup a Twilio account

#### If you haven't already, sign up for an account at [twilio.com](https://www.twilio.com/)

#### If you don't have one, you can get a free a [Twilio phone number](https://www.twilio.com/console/phone-numbers/search)

#### Create .env file and ddd your twilio account info in it as below

```
  TWILIO_ACCOUNT_SID=YOUR TWILIO Account_SID
  TWILIO_AUTH_TOKEN=YOUR TWILIO AUTH_TOKEN
  TWILIO_NUMBER=YOUR TWILIO NUMBER +1XXXXXXXXXX
  TWILIO_USERNAME=The username you want to get all the goals through Twilio inbound messages
```

---

## Backend Design

> ### Auth API for Authenication
>
> > `POST /auth/login` &nbsp; &nbsp; Login to your account and request an API Auth Token
> >
> > `POST /auth/register` &nbsp; &nbsp; Create a new account and request an API Auth Token
>
> ### Users API for managing users
>
> > `POST /users` &nbsp; &nbsp; Logged in and you can get all the users in the system
> >
> > `POST /users/:username` &nbsp; &nbsp; Logged in and you can see other user's profile and goals with the username name in the url
> >
> > `PATCH /users/:username` &nbsp; &nbsp; Logged in and only the user him/herself can change his/her profile info with username in the url
> >
> > `DELETE /users/:username` &nbsp; &nbsp; Logged in and only the user him/herself can delete his/her account with username in the url
>
> ### Goals API for managing goals
>
> > `GET /goals` &nbsp; &nbsp; Anyone can see the goals all the users creaetd in the system
> >
> > `POST /goals/:username/:id` &nbsp; &nbsp; Logged in and only the user him/herself can see all the steps related to the goal he/she created with his/her username and the goal id
> >
> > `POST /goals/:id/support`&nbsp; &nbsp; Logged in and the user can support/follow other people's goal with the goal id
> >
> > `POST /goals/:username`&nbsp; &nbsp; Logged in and only the user can create a goal in his/her account with username in url
> >
> > `PATCH /goals/:username/:id`&nbsp; &nbsp; Logged in and only the user can edit the goal he/she created with his/her username and the goal id
> >
> > `DELETE /goals/:username/:id` &nbsp; &nbsp; Logged in and only the user can delete the goal he/she created with his/her username and the goal id
> >
> > `POST /goals/:username/:id/complete` &nbsp; &nbsp; Logged in and only the user can change the statw of the goal to "completed" he/she created with his/her username and the goal id
>
> ### Steps API for managing steps
>
> > `POST /steps/:username/:goal_id/:step_id` &nbsp; &nbsp; Logged in and only the user can see a specific step for one goal with provided username, goal id and step id
> >
> > `POST /steps/:username/:goal_id` &nbsp; &nbsp; Logged in and only the user can create a new step for one goal with provided username, goal id
> >
> > `PATCH /steps/:username/:goal_id/:step_id` &nbsp; &nbsp; Logged in and only the user can edit a specific step for one goal with provided username, goal id and step id
> >
> > `DELETE /steps/:username/:goal_id/:step_id` &nbsp; &nbsp; Logged in and only the user can delete a specific step for one goal with provided username, goal id and step id
>
> ### Twilio API for managing twilio inbound messages
>
> > `POST /twilio` &nbsp; &nbsp; With Twilio inbound message the user can get all the not complted goals from text messages. Now the username if the goals is hard coded in the route. Will work on making it dynamic.

---

## Frontend Design

## [FRONTEND README](https://github.com/Ronihe/phoenix-hope/tree/master/frontend)

## Todo for the application

- Data validation from server side by adding json schema
- Error handling at server side
- add the frontend page when you vist the website you can see the ten most created goals

---
