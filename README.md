# DevSiteNew

## Overview

DevHyre is a Software Developer hiring site similar to LinkedIn. Developers can create profiles and message other devs, 
and Employers can create profiles to post jobs and find prospective employees to message them directly. Users are sorted and matched to job postings 
they are most qualified for based on their language proficencies.

**LIVE LINK**: http://18.219.111.79 

## Features:

-Socket.IO for real-time private messaging feature between clients

-Bcrypt and JWT for secure login/registration

-AWS S3 buckets for persistent photo upload

-Deployed on AWS utilizing NGINX reverse-proxy

### Run Locally:

From your terminal:

```
git clone https://github.com/Andrewgl22/DevSiteNew.git
```
To run client:
```
cd client
npm i
npm start
```
To run server:
```
cd server
npm i
nodemon server.js
```
