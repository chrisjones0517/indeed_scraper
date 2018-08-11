# Indeed Scraper

### Overview
##### Although statistics about the growth rate of various technologies are widely available, this may not help an entry-level/junior developer determine the best focal point in which to gain employment in the industry in a given locale. Identifying technologies that are currently in demand in a given region or city is more fundamental to those who are beginning their careers. This fairly simple scraping app is intended to give web developers a visualization of what technologies are most popular by keywords contained in job listings in their respective local job markets. Since the focus is on utility, the UI/UX is not polished. Please feel free to style the application to your preferences.

### Use
##### To use the app, simple clone it to your local machine, then run ```npm install```. Once the install has completed, run ```node index```, and then wait until the you see data populate into the terminal. Lastly, open your browser to ```localhost:3000```, and the graphical display should be rendered. The user can change any of the query data at the top of the ```index.js``` file to suit his/her search preferences.

### Note:
##### This application requires a substantial level of processing power. If being run on an older processor, it may be necessary to change the ```waitTimeout``` value in the script in ```index.js``` to a value commensurate with available processing power to ensure that the server script has time to run before the time limit is reached. These scripts will take approximately 1-2 minutes to run on most systems. This is because tens of thousands of lines of text will be processed in the application, as it is currently formatted. In the event that the page loads with no chart, clicking the refresh button will allow the chart to load.

## Happy Job Hunting!!!

