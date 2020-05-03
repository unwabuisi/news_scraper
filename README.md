# HackerNews Scraper

### Live Version - [HERE](https://evening-coast-01303.herokuapp.com/)

HackerNews is one of my favorite sites to browse, so I created a scraper / note-taker.

This  application scrapes the top 30 posts from the HackerNews front page and allows users to quickly navigate to the article link, discussion, or see the top comment on the discussion page.

If the user likes an article or the discussion, they can save it to a database and add notes of their own.


This web application was deployed through Heroku and uses the following libraries/frameworks:
- [Express](https://expressjs.com/) (Routing / API design)
- [Handlebars](https://handlebarsjs.com/guide/) (server-side HTML templating)
- [CheerioJS](https://cheerio.js.org/) (web scraper)
- [MongoDB](https://www.mongodb.com/) / [MongooseJS](https://mongoosejs.com/docs/index.html) (NoSQL database)
- [mLab MongoDB](https://www.mlab.com/) (remote MongoDB DaaS for Heroku deployment)
- [MaterializeCSS](https://materializecss.com/getting-started.html)
- [Axios](https://github.com/axios/axios) (web requests)


###### On the home page you can:
- Scrape the latest articles
- Save an article to the database

###### On the Saved Articles page you can:
- delete a saved article from the database
- add / remove your own notes on a saved article


##### API Routes - These routes will return JSON objects from the database

[/api/all](https://evening-coast-01303.herokuapp.com/api/all) - returns all saved articles in the database with their "notes" populated

[/api/all/:articleID](https://evening-coast-01303.herokuapp.com/api/all/) - returns an object for a specific article, depending on which article ID paramater is passed

\* *to test: visit the [/api/all](https://evening-coast-01303.herokuapp.com/api/all/articleID) route and copy an article's ID then replace "articleID" at the end of this route*

[/api/articles/](https://evening-coast-01303.herokuapp.com/api/articles) - returns all saved articles in the database **without** their "notes" populated

[/api/notes](https://evening-coast-01303.herokuapp.com/api/notes) - returns all saved notes in the database; does not show relational data on which notes are associated with which articles


### Future features:
- [ ] Click to update notes that are already in the database

### Personal Notes:

##### Top Comment
- I added the top comment feature because a lot of times the top comment represents the general tone of the discussion and I can get a quick feel for the article or post being discussed.

##### MaterializeCSS
- I normally use Bootstrap for styling but wanted to force myself out of that routine and try something new. I actually found that I like materialize alot more. It feels a lot more intuitive than bootstrap to me.


##### MVC File Structure
- As I build more web applications, I'm understanding how important file structure and modularity is. Ideas like keeping API routes, separate from regular routes helps with staying organized as a codebase grows.

##### Hiding Complexity
- As simple as this app seems, I still ran into some challenges building out all the CRUD actions.
	1. Mongoose by definition is a non-relational database and I had to build a one-to-many relationship with the Articles and their respective Notes (an article has many notes; each note is linked to only one article) There was not much info online about cascading deletes (when you delete an Article, you also have to delete associated Notes) so I had to build a custom method which works how I expected it to.
	2. Event Delegation with jquery buttons was a small speed bump, if anything it's made me want to look for ways I can use vanilla JS instead.
	3. Web Scraping is ugly, but keeping html elements intact with top comments was a nice feature. Sometimes comments on HackerNews have things like code blocks, or outbound links and finding a way to preserve those formats was a challenge I enjoyed overcoming.


