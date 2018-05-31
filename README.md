## FACGTracker :sparkles: :sparkles:

#### Our application is about :
1.  Tracking students attendance and their behavior .
2.  Improve learning process by giving and taking feedback from/to students .
3.  Notify students if they have a bad behavior by getting red flag .
4. Easier for facilitator to obtain student information .

#### The problem :
A better way of organizing the process of applying conducts and improve the adherence of code conducts .

 #### user stories :

 ###### As a facilitator I can :

* Add feedback :
  * He must to login to website .
  * From side navbar select the option 'students' .
  * View the list of all cohort students , every item in the list have student name and choice to open his profile or delete it
  * He click 'view profile' button he will directed for student profile .
  * Student profile displayed with side navbar ,if he choose the 'feedback' option ,he can add his feedback in text area and click on the button 'send' and it will be added on the list of feedback .  
* Login .
* Add red flag with its type .
* Daily ,Weekly ,Monthly report for Tracking students attendance .
* View students information .
* Invite students to register in the application .

### Database Schema
![DB](https://b.top4top.net/p_881jm85o1.png][img]https://b.top4top.net/s_881jm85o1.png)

### Flow chart

### User testing findings:

#### Prototype
* Good app , but UI needs some changes.

#### MVP user testing findings:
* UI, UX still needs more improvment.
* Bug with attendance and invite student (temporarily fixed).

There is the link of our prototype on figma website [Here ](https://www.figma.com/proto/FCcckCpvVWWkohq1R76ElzJO/FACG-tracker?node-id=45%3A20&scaling=contain)

### Finished Tasks:
- [x] Login as student if he is invited or cf, auth with Github.
- [x] Home page for view student statistics, week mentors and schedule for current week with current data and chenge it daily . 
- [x] Take attendence.
- [x] Profile page for students.
- [x] Add feedback for student.
- [x] Add red flag for student.
- [x] Delete any student.
- [x] Invite student by adding his email.
- [x] Undo invite student by delete his email.
- [x] view complaints and suggestion for cf and specified with student name.
- [x] Deleing with unauthenticated users and wrong routes.
- [x] Authorization for cf and student.

### Unfinished Tasks (Future plans):
- [ ] Weekly and monthly reports.
- [ ] Footer (under development.

### Technologies:
``` HTML
CSS, JS, ExpressJS, Hb, Postgres, Passport and dithub strategy , google API
```
# How to run? :key: :runner:
 ### Visit the [Link](https://facgtracker.herokuapp.com)

 ### A coder? don't worry it's open source!  :boom: :fire: :
 1) Clone the repo `https://github.com/FACG4/FACGTracker.git`
 2) Run $ npm install
 3) $ npm run build:db, npm run dev
 4) Use your browser and jump into `localhost:3000`

group.members = { a.shatat, amusameh, inasstubail, balsam-faysal } 
