# TTSforChrome

## What?
**TTSforChrome** is a chrome extension which uses your computer's native built-in speech engines to create a powerful tool for reading (or rather, hearing) texts on the web.

## How?
After you [install the extension](#get-started) you can simply use it by selecting any text on the sceen on any webpage, and pressing `Alt + T` on your keyboard. A small window will appear and will read to you the text you selected, while highlighting the words as it reads them to you. You can also press `Alt + D` to pause/resume the reading, or `Alt + T` again to stop it alltogether.

## Why?
Developed by a vision-impared person, this app is here to help people who have trouble reading texts (for whatever reason, e.g. bad vision, concetration problems, etc.) to read long contents easier. We found out that the text-highlighting feature which leads your eyes as you listen is a key advantage for the above people, and hope to make it easier for them by releasing this open-source Chrome extension.

## Who?
This extension was developed by Eliyahu Akiniazov (@ilusha1991), at first for personal use.
Some minor support by Reuven Karasik (@kinging123).

## Get Started
1. First, clone the project locally. *(You can use a git client like SourceTree, if you like)*
2. Run the command `npm install` to install all the project dependencies listed in the `package.json` file.
3.  Run the command `npm run make` to build the JS code into a `bundle.js` file using Browserify.
4. Go to your extensions page on chrome (chrome://extensions) and tick the select box labeled "Developer Mode" on the top of the page.
5. Click on "Load unpacked extension" and select the folder you cloned the project to.

#### After making your changes:
1. If the change involved JS code modification, run the `npm run make` command again to rebuild the code.
2. Click on the "Reload" link on the Chrome Extensions page under the extension's name.
3. Don't forget to create a pull request!


Happy coding :)
