This sample has the same features as the StudyBotNode app, but is not made for Visual Studio. The Express feartures are still there.

# Prerequisites

1. Once your [qna-luis-bot-node](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/qna-luis-botv4-node) has been created, from your download of the sample, open the StudyBotNode_CLI folder and open a command line from it.
1. Install the node modules by entering this command from your root folder:
```
npm i
```
1. Open the `index.pug` file in a text editor.
1. Follow the directions (starting at step 3) to create a Direct Line channel in Azure from your bot, [here](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/StudyBotNode).

# Run and Test
1. After your Direct Line secret is pasted into the `index.pug` file, run the app from the command line:
```
npm start
```
1. You will see it open in the browser, but make sure to run in Chrome or Firefox. Edge and IE will not show the microphone button located in the lower-right corner of your webchat.
1. Say hello to your bot, by typing "hi" in the webchat, then press "enter" on your keyboard. It might take a minute for the bot to warm up, so if it says "failed, cannot send", just try typing it again.
1. Once you see a response, try testing your knowledge bases by typing "virus". A definition for virus should appear, plus if you click on the website tabs below the webchat, you should see a search has automatically been performed for your query. In the query, the study topic has been added to the search so your results are more relevant. For instance, if you searched for "time", instead of getting watches and the like, you will get time in regards to geology (one of the study topics).
There will be no search performed for conversational words (like "hi" or "how are you?") or for other phrases/words that are not in your knowledge base. The bot will tell you if it does not understand a query.
1. To show the flexibility of the bot and how we programmed it, try typing "time" into the webchat. It will return the top three best choices, so in this case, "era", "period", and "epoch" definitions will be returned from the bot. 
1. To test the Speech service part of the app, click the microphone icon in the webchat and begin speaking. Make sure your browser has the microphone enabled (permissions).
1. The Speech service will automatically record your voice until you you pause, then it will stop and print what you say in the webchat. When the bot responds, you'll hear it speak as well.
