# Prerequisites

1. Make sure you have created a [bot](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/qna-luis-botv4-node) using this sample as a guide. 
1. Download the git URL, then open the solution file locally.
1. Since the StudyBotNode app is considered an external client that needs to access the bot in Azure, we'll need to connect it to a Channel called Direct Line. To do this go to the Channels menu in your web app bot resource in Azure and click the globe icon.

    <img src="/Assets/enable-directline.png">

1. This initializes the Direct Line channel. A popup appears that has your bot secret key.

1. Click show and copy (either key will work), then paste into `index.pug` of your downloaded sample where indicated.
    
    <img src="/Assets/bot-secret-key.png">

1. In Azure, click "Done" at the bottom. Then you will see Direct Line has been added next to Web Chat and is now a part of your bot.

    <img src="/Assets/directline-done.png">
    
# Run and Test
    
1. Once the secret is added, run the solution and watch it open in a browser. For optimal results view in Chrome or Firefox. If you view in Edge or IE, the microphone button will not show (in the lower-right corner of the webchat), but rather you will see a send button.

1. Say hello to your bot, by typing "hi" in the webchat, then press "enter" on your keyboard. It might take a minute for the bot to warm up, so if it says "failed, cannot send", just try typing it again.
1. Once you see a response, try testing your knowledge bases by typing "virus". A definition for virus should appear, plus if you click on the website tabs below the webchat, you should see a search has automatically been performed for your query. In the query, the study topic has been added to the search so your results are more relevant. For instance, if you searched for "time", instead of getting watches and the like, you will get time in regards to geology (one of the study topics).
There will be no search performed for conversational words (like "hi" or "how are you?") or for other phrases/words that are not in your knowledge base. The bot will tell you if it does not understand a query.
1. To show the flexibility of the bot and how we programmed it, try typing "time" into the webchat. It will return the top three best choices, so in this case, "era", "period", and "epoch" definitions will be returned from the bot. 
1. To test the Speech service part of the app, click the microphone icon in the webchat and begin speaking. Make sure your browser has the microphone enabled (permissions).
1. The Speech service will automatically record your voice until you you pause, then it will stop and print what you say in the webchat. When the bot responds, you'll hear it speak as well.

    




