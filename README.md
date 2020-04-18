# Bachelor Thesis

Educational platform, that returns tailor-made content based on the 
student‘s learning profile and recommends new content on observed 
preferences.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Concepts](#concepts)
3. [Features](#features)
4. [Technical Details](#technical-details)
5. [Built With](#built-with)

## Getting Started

### Prerequisites

Before you start with the installation, please make sure you have set up your 
environment according to the [Apostrophe Documentation](https://docs.apostrophecms.org/apostrophe/getting-started/setting-up-your-environment). 
This will save you a lot of headaches ;)

### Installation

Clone the repository

```
git clone https://github.com/vincentrohde/bachelor.git
```

Install the dependencies.

```
npm install
```

### Account Creation

First of all, create an admin account. The prompt will ask for a password of your choice.
Make sure to remember your password!

```
node app.js apostrophe-users:add admin admin
```

### Starting the Server

Now you can run the server, like this.

```
node app.js
```

Once the server runs, the project is ready under this URL:

```
http://localhost:3000
```

### Login

The first thing you will have to do, is navigate to the login screen. 

```
http://localhost:3000/login
```

Now you can login using the admin credentials you set up earlier.

## Concepts

Okay, now that you have everything up and running, it's time to create some content.
By doing this, you will get a better understanding of the project's general concepts,
when it comes to content management. In the next chapters the focus will be more
on the stuff behind the scenes (the backend code).

## Features

Besides of the 

### Tracker

The Tracker module watches the user's interaction with the site. 
It collects various data, from content-elements (style, difficulty, practicality, type) and 
posts/ favorites (id, tag (category)). These are stored and managed in two cookies:
`learningStyle` (the student profile) and `favorites`. These cookies are processed by the [Preferences](#preferences) module.

#### Likes

Every content-element inside a post is equipped with a like widget. The user
has the option to share his content preference, with the Tracker, by liking 
or disliking the element.

#### Favorites

Each post can be saved by the user, through the favorite icon. Setting a
post as a favorite will be picked up by Tracker. Favorites are the main source
for content recommendation (posts on the front page).

### Preferences

The Preferences module generates user profiles, based on the data from the [Tracker](#tracker) 
generated cookies. The learning-style profile is used by the [Curator](#curator) 
module to filter the content inside posts. While the favorites profile is used 
[when querying from MongoDB](#apostrophe-pagesbeforesend-event).

### Curator

The Curator module is used to filter content-elements from the response object for a Post page, 
based on the provided learning profile. The algorithm's priority of filtering is 
the following, from highest to lowest:

1. Learning style
2. Difficulty
3. Practicality
4. Media Type

## Technical Details

### apostrophe-pages:beforeSend Event

The apostrophe-pages:beforeSend event is an event of the Apostrophe internal `apostrophe-pages`
module. It is the final event before sending out data to the client. This 
project makes use of this event in two situations: 

1. [Content aggregation on the startpage](#apply-filters-to-content-requests-start-page)
2. [Content curation inside posts](#curator)

In both cases it is used to allow alteration of the response to the client.

### Apply Filters To Content Requests (start page)

When requesting Posts for the start page, a few filters are applied to the 
database request. 

```
req.data.filteredPosts = await self.apos.docs.getManager('post')
    .find(req)
    .tags(tagPreferences)
    // newest posts
    .sort({ updatedAt: -1 })
    .limit(5)
    .toArray();
```

## Built With

- [Apostrophe v2](https://github.com/apostrophecms/apostrophe)
- [Apostrophe Boilerplate v2](https://github.com/apostrophecms/apostrophe-boilerplate)
- [Apostrophe Documentation](https://docs.apostrophecms.org/apostrophe/)
- [MongoDB](https://github.com/mongodb/mongo)
- Lots of debugging, reading documentation and browsing issue threads ❤️

[Back To Top](#bachelor-thesis)
