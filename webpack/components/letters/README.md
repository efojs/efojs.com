# Stats of letters in text
Counts first letters of words and all letters in text and draws their distribution. Initially made to analyse names of subscriptions on Reddit (why not?) and practice some React, but actually works with any latin text with numbers
# Usage
## List your subreddits (or take any text)
- By hands, or
- Grab with following JavaScript:
  - In desktop browser open https://old.reddit.com/ (it has less fancier layout which is easier to grab)
  - Open console (Ctrl+I on Windows (?) or Cmd+I on Mac)
  - Paste the code (all or by function)
- Copy generated list, paste into input field and press Render (all done locally on your computer, nothing is saved)

**Execute code only if you understand how it works and what it does  
Read comments to get what every line does  
No guarantee that it will not harm your computer or data**
```
// This code opens list of your subscription, takes text
// from every link in it and REPLACES all contents
// of page with it, so you can easily select and copy it

// This line finds and clicks on subscription dropdown
document.querySelector("#sr-header-area > div > div.dropdown.srdrop").click()

// This takes all links in that dropdown
links = document.querySelector("#sr-header-area > div > div.drop-choices.srdrop.inuse").children

// Creates empty container for names
subs=[];

// Cycles trough all links and takes their visible text
for (let link of links) {
	subs.push(link.innerText);
}

// Removes last element, should be "EDIT SUBSCRIPTIONS"
subs.pop(253)

// Finds body of page and replaces its content with created list
// (to see Reddit again just reload page)
document.body.innerText = subs.join(", ")
```
