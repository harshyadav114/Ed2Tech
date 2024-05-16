# Edulity Ed-Tech Platform

Edulity is a versatile and intuitive ed-tech platform that enables users to create, consume, and rate educational content. It provides a seamless and interactive learning experience for students while offering a platform for instructors to showcase their expertise and connect with learners worldwide. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Front-end](#front-end)
3. [Back-end](#back-end)
4. [API Design](#api-design)
5. [Deployment](#deployment)

## System Architecture
The Edulity ed-tech platform follows a client-server architecture with the following main components:

- **Front-end:** Built with ReactJS, it communicates with the back end using RESTful API calls.
- **Back-end:** Developed with NodeJS and ExpressJS, it handles user authentication, course management, and more.
- **Database:** Utilizes MongoDB as a NoSQL database to store course content, user data, and other relevant information.

## Front-end
The front end of Edulity is built with ReactJS, offering a dynamic and responsive user interface for students and instructors. Here are some key pages and functionalities:

### For Students:
- Homepage: Introduction to the platform.
- Course List: List of available courses with descriptions and ratings.
- Cart Checkout: Complete course purchase using Razorpay.
- Course Content: Access course material, including videos.
- Enrolled Courses: Progress and list of enrolled courses.
- User Details: Account information.
- User Edit Details: Edit account information.

### For Instructors:
- Dashboard: Overview of instructor's courses and ratings.
- Insights: Detailed course including the number of views, clicks, and other relevant metrics.
- Course Management Pages: Create, update, delete courses.
- View and Edit Profile Details: Account management.

Front-end tools and technologies include ReactJS, CSS, Tailwind CSS, Redux for state management, and VSCode for development. Additionally, some npm packages are used to add extra functionality to the front end.

## Back-end
The back end of Edulity is built with NodeJS and ExpressJS and uses MongoDB as its primary database. Key features and functionalities include:

- User Authentication and Authorization: Secure login, OTP verification, and forgot password functionality.
- Course Management: Instructors can create, update, delete courses, and students can view and rate them.
- Payment Integration: Razorpay integration for course purchases.
- Cloud-based Media Management: Cloudinary for storing and managing media content.
- Markdown Formatting: Course content is stored in Markdown format for rendering.

Frameworks, libraries, and tools used: Node.js, MongoDB, Express.js, JWT for authentication and authorization, Bcrypt for password hashing, and Mongoose for database interaction.

### Data Models and Database Schema
- **Student Schema:** Includes name, email, password, and course details.
- **Instructor Schema:** Includes name, email, password, and course details.
- **Course Schema:** Includes course name, description, instructor details, and media content.

## API Design

Edulity's API follows the REST architectural style, implemented using Node.js and Express.js. It uses JSON for data exchange and standard HTTP request methods. Below are the main categories and their corresponding endpoints.

### Course Management
- `POST /createcourse` - Create a new course.
- `POST /courseupdate` - Update an existing course.
- `POST /deletecourse` - Delete a course.
- `GET /getinstructorcourse` - Retrieve courses managed by an instructor.
- `POST /getcoursedetail` - Get details of a specific course.
- `POST /getUnauthorisedCourseDetail` - Get course details without user authentication.
- `GET /getenrolledcourses` - Get a list of courses a student is enrolled in.

### Section and Subsection Management
- `POST /createsection` - Create a new section within a course.
- `POST /deletesection` - Delete a section within a course.
- `POST /updatesection` - Update a section within a course.
- `POST /createsubsection` - Create a new subsection within a section.
- `POST /deletesubsection` - Delete a subsection within a section.
- `POST /updatesubsection` - Update a subsection within a section.

### Ratings and Reviews
- `POST /createrating` - Create a new rating for a course.
- `POST /getavgrating` - Get the average rating of a course.
- `GET /getallrating` - Get all ratings for a course.

### Category Management
- `POST /createcategory` - Create a new category for courses.
- `GET /showallcategory` - Show all categories.
- `GET /showallcategorywithpublishedcourse` - Show all categories with their published courses.
- `POST /categorydetails` - Get details of a specific category.

### User Progress
- `POST /updatecourseprogress` - Update the course progress for a student.

### User Authentication and Profile Management
- `POST /signup` - Register a new user.
- `POST /login` - Authenticate a user login.
- `POST /sendotp` - Send an OTP for verification.
- `POST /changepassword` - Change a user's password.
- `POST /resetpasswordtoken` - Generate a token for password reset.
- `POST /resetpassword` - Reset a user's password.
- `POST /profileUpdate` - Update a user's profile information.
- `POST /deleteAccount` - Delete a user's account.
- `POST /updatedProfileImage` - Update a user's profile image.
- `GET /instructordashboard` - Access the instructor dashboard.

### Payment Processing
- `POST /capturepay` - Capture payment from a student.
- `POST /verifypay` - Verify payment details.
- `POST /sendpaymail` - Send a payment success email to a student.


## Deployment
Edulity is deployed on various cloud-based services:

- **Front-end:** Vercel for static site hosting.
- **Back-end:** Render for Node.js and MongoDB hosting.
- **Media Files:** Cloudinary for media content storage.
- **Database:** MongoDB Atlas for database hosting.


## Future Enhancements for Edulity

1. **Adaptive Content Delivery:** 
   - Utilize machine learning algorithms to dynamically adjust course content based on individual learning pace, proficiency levels, and areas of interest, ensuring an adaptive and tailored learning experience for each user.

2. **Virtual Reality (VR) Integration:** 
   - Explore the integration of virtual reality technology to create immersive learning environments, allowing users to experience hands-on simulations, virtual labs, and field trips within the platform.

3. **Gamification Elements:** 
   - Incorporate gamification elements such as badges, leaderboards, and rewards to incentivize learning, motivate users to progress through courses, and foster a sense of achievement.

4. **Accessibility Features:** 
   - Improve accessibility by implementing features such as screen reader compatibility, text-to-speech functionality, and customizable user interfaces to cater to users with diverse needs and preferences.

5. **Advanced Analytics Dashboard:** 
   - Develop an advanced analytics dashboard for instructors and administrators to gain deeper insights into user behavior, course effectiveness, and platform usage trends, enabling data-driven decision-making and optimization strategies.

6. **Mobile Application Development:** 
   - Expand the platform's reach by developing dedicated mobile applications for iOS and Android devices, providing users with seamless access to educational content and features on-the-go.


This infrastructure ensures scalability, security, and reliability.

