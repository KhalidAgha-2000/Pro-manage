# Pro_Manage

## Enterprise Resource Planning (ERP)
## Project Description

A lot of companies tend to grow quickly without having the proper infrastructure to do so. To make up for that, they go for several third party applications that they have no control over and have to use several of or, and its becoming very common, they make their own all inclusive software to manage all their business needs in one centralized application.

## Expected Solution Description

An ERP system is required. For the sake of simplicity we will only be handling a small part of the HR process now as an admin. An admin can't sign up, but is added by one of the existing admins.

Every admin should be able to track several aspects of the HR process.
He/She should be able to:
1. Create and manage employees and their profiles.
2. Create and manage admins
3. Create and manage teams.
4. Create and manage projects.
5. Assign employees to teams.
6. Assign teams to projects.
7. Create KPIs for every employee.
8. Evaluate employee KPIs.
9. Display Reports.

## Employees
- Every employee must have a profile.
- An admin can go over a list of employees and select any employee profile to be viewed and edited.
- An employee should have a unique id that must be automatically generated, first name, last name, email, phone number, picture. 
- An employee must be assigned to only one team.
- Employees can't sign in. Only admins can.

## Teams and Projects
- A team can have several projects.
- Every employee must have a role in the project (chosen from a predefined list)

## KPIs
- Think of the KPIs as skills and milestones the employee must learn and improve in for the sake of getting promotions and staying in the company.
- Every employee may have several KPIs.
- Several employees may have a KPI with the same name, however this KPI must be unique. Example: if employee X has KPI "Project Management", it is not the same as employee Y's "Project Management" KPI. They should have separate entries.
- Every employee must have a certain evaluation for every KPI. You can choose the type of evaluation yourself. It can be 1 to 10, or A,B,C... or whatever you want. Make sure you state what the evaluation system you choose is.
- The admin must be able to evaluate the KPIs of each employee from the mobile app as well as the web.
- You must keep track of every KPI change along with its date. (You must not lose the old data).


## Reports
- The admin can display employee reports.
- There are three kinds of reports:
  1. Employee project report: Shows all the projects the employee took part in and their role in it.
  2. Employee KPI reports:
    - Overall KPI list with current values.
    - Individual KPI change over time with graph.

<hr>

## Rules and Restrictions
- Can't delete a project while it has teams related to it.
- Can't delete a team while it has employees assigned to it.
- Employees can only be assigned to one team but team can be assigned to several projects.

<hr>

## Prerequisites
Before running the project, ensure you have the following:

- Node.js: Make sure you have Node.js installed on your machine.

- MongoDB: You will need a running MongoDB server for the project. Make sure you have MongoDB installed and running locally or provide the connection details to a remote MongoDB server.

Package Manager: This project uses npm (Node Package Manager) to manage dependencies. You should have npm installed along with Node.js.

- Environment Variables: Some environment variables required for the project. 

- The project relies on various dependencies and libraries. These dependencies are listed in the project's package.json file. To install them, run npm install in the project's root directory. 

<hr>

## Installation

- Clone this repository to your local machine.
- Navigate to the project directory.
- Run npm install to install the required dependencies


<hr>

## Configuration

To configure the project with your MongoDB project, follow these steps:

1- Set up a MongoDB database (if you haven't already) either locally or on a remote server.

2- Obtain the connection details for your MongoDB database, including the host, port, database name, username, and password.

3- Replace the configuration variables or connection string in your project with the corresponding MongoDB connection details.

<hr>

## Usage

Run npm run dev to start the development server.

Access the application in your browser at http://localhost:5173/.

> email : khalid@prom.com

> password : 123123

<hr>

<hr>

## Postman Collection
To interact with the API endpoints and test the functionalities of the Pro_Manage project, you can use the provided Postman collection. Follow the steps below to import the collection into Postman:

1- Visit the Postman collection file from the following location: 
 - https://documenter.getpostman.com/view/25121847/2s93z6eQHY

2- Click on "Run in Postman" button.

3- In the dialog, click on the available application.

4- Once the collection is uploaded, you will see it listed in the left sidebar of Postman.

You can now explore the available endpoints, request bodies, and response structures in the collection to interact with the Pro_Manage API.



<hr>

## Contact

If you have any questions or suggestions regarding this project, feel free to reach out .

- Name : Mohamad Khalid Kassem Agha
- Email : mkhalid.k.agha@gmail.com
- LinkedIn : https://www.linkedin.com/in/khalid-agha/

Feel free to customize the sections and information based on your specific project requirements.

<hr>

## Live Demo

- https://pro-manage-v1.vercel.app
