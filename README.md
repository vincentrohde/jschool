## Bachelor Thesis

Educational platform, that returns tailor-made content based on the 
student‘s learning profile and recommends new content on observed 
preferences.

## Table of Contents

1. <a href="#getting-started">Getting Started</a>
2. <a href="#features">Features</a>
3. <a href="#built-with">Built With</a>

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

Install the dependencies

```
npm install
```

Create an admin account. The prompt will ask for a password of your choice.

```
node app.js apostrophe-users:add admin admin
```

Now you can run the server, like this.

```
node app.js
```

Once the server runs, the project is ready under this URL:

```
http://localhost:3000
```

## Features

### Tracker (Frontend)

The Tracker module watches the user's interaction with the site. 
It collects various data, from content-elements (style, difficulty, practicality, type) and 
posts/ favorites (id, tag (category)). These are stored and managed in two cookies:
`learningStyle` (the student profile) and `favorites`. These cookies are processed by the CMS.

## Built With

- [Apostrophe 2](https://github.com/apostrophecms/apostrophe)
- [Apostrophe Boilerplate v2](https://github.com/apostrophecms/apostrophe-boilerplate)
- [Apostrophe Documentation](https://docs.apostrophecms.org/apostrophe/)
- Lots of debugging, reading documentation and browsing issue threads ❤️

<a href="#bachelor-thesis">Back To Top</a>
