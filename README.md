## SonarQube

- You can access the SonarQube dashboard to view the current code quality status:

> https://scm.thm.de/sonar/dashboard?id=ToDoScrum

- Use following command to update the dashboard to analyse the current state of the main-branch:

> npm run sonar

- Currently it is not possible to bind SonarLint to the THM-SonarQube-Server because of the THM-Server being on a lower
version than the currently supported SonarLint-Plugin
- Still it can check code on a standalone base, so it is advised to install the SonarLint-Plugin

## Using ESLint & Prettier

- You can use following command to view current ESLint errors:

> npm run lint

- You can use following command to fix and view problem to fix, which are not automatically able to fix with:

> npm run lintfix

- To format code with prettier you can use following command:

> npm run format
