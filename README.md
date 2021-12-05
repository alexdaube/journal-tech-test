# Thinkific Multi-User Journal Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite
  - You are free to use other databases of your choice

### 2. Install npm dependencies

```
yarn
```

### 3. Create .env file

```
cp .env.example .env
```

### 4. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

Seed the database with the sample data from [`prisma/seed.js`](./prisma/seed.js).

```
npx prisma db seed --preview-feature
```

### 5. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## Submission

Update this README file by answering the questions below.

### Date Or Reflection

December 4, 2021

### Location of deployed application (not necessary for Junior Engineers)

https://journal-tech-test.herokuapp.com/

### Instructions to run assignment locally

The database was changed to postgres for production purposes.

##### Prerequisites 
 * Make sure that docker and docker-compose CLI is installed on your machine
 * Make sure nothing is running locally on port 5432. Usually another postgres database...

##### Start the database with docker
```zsh 
// At the root of the project in a command line shell
docker-compose up postgres
```
All the other commands are still valid once this is set up.

### Time spent
Development: 4 hours
Deployment and questions: 2 hours
Total: 6 hours

### Assumptions made

- I assumed that it would be ok to use a modal instead of dedicated page for the new post form.
- Post content would be a required field in the post form 
even though the content field is nullable in the database schema.
- UI wow factor is not important for the purpose of this technical test.
Making very pretty UI is a huge time waster for me when there are no mockups.

### Shortcuts/Compromises made
Shortcuts:
 - Used `Material-UI` because of my familiarity with it. 
 - Used `react-hook-form` for the post form and `yup` fields validation.
 
Compromises:
 - I didn't write any automated testing. 
The fact that I usually use Typescript(interface vs prop types)
and that I have never used Next.js and Prisma before 
made me spend a lot more time inside the documentation than I usually would for this kind of feature. 
Of course, I could have used a more familiar project setup, but
I thought it would be good to use this technical test as an educational experience. 

 - I didn't use the markdown library for the content input 
because I wanted to keep the UI as simple as possible for the first iteration of the feature. 
This would have surely been an improvement I would have explored.

 - There a couple of warnings in the console, which I would have normally fixed.

 - The code could have been cleaner. I would normally take the time to refactor 
and make sure my code follows the team's standard.   
### Assume your application will go into production...

#### 1) What would be your approach to ensuring the application is ready for production (testing)?
 - Implement a battery of functional testing
 - Review my code
 - Manually try to break my feature.
 - Request a peer review

#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
 - UI wise it would be interesting
to use sockets providing "real-time" updates of the journal.
 - Have an infrastructure with load balancing to achieve automatic scaling by spawning new server instances when needed.
 - Make sure the instance type/hardware hosting the database is strong enough for the required traffic.
 - It's important to keep the api/backend calls fast and efficient, especially at the data layer.

#### 3) What key steps would you take to ensure application security?
- Make sure the database is not accessible from external network. For example setting up a VPC on AWS.
- Make sure to routinely back up the database.
- Make sure the SSL certificate is set up. 
- Make sure to use cookies not locale storage to store token in the frontend.
- Sensitive data like a password must be encrypted.
- Keep key dependencies like authentication libs, encryption libs, framework libs 
and the language version are up-to-date.
- Try to design UI with DDoS in mind.
- Sanitize HTML (React takes care of that mostly in our case)
- Have strong application logging/monitoring

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
 - Functional tests
 - Markdown support
 - Better looking UI

### Other information about your submission that you feel it's important that we know if applicable.
None

### Your feedback on this technical challenge
None

