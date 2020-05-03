# HackerNews Scraper

Hacker is one of my favorite sites to browse, so I created a scraper / note-taker.

This web application scrapes the top 30 posts from the HackerNews front page and allows you to quickly navigate to the article link, discussion, or see the top comment on the discussion page.

This web application uses the following libraries/frameworks:
- MaterializeCSS
- MongoDB / MongooseJS (NoSQL database)
- CheerioJS (web scraper)
- Axios (web requests)
- Express (routing / API design)
- Handlebars (server-side HTML templating)


###### On the home page you can:
- Scrape the latest articles
- Save an article to the database

###### On the Saved Articles page you can:
- delete a saved article from the database
- add / remove notes on a saved article




##### API Routes - These routes will return JSON objects

/api/all - returns all saved articles in the database with all their "notes" populated

/api/all/:articleID - returns a specific article's object

/api/articles/ - returns all saved articles in the database **without** "notes" populated

/api/notes - returns all saved notes in the database




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