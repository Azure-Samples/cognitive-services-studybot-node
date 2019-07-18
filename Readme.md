---
page_type: sample
languages: 
- javascript
- nodejs
products:
- azure
- azure-cognitive-services
description: "These samples create a Study Bot chat client using QnA Maker."
---

# Study Bot (Node.js)

This sample has a [StudyBotNode](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/StudyBotNode) app which was created in Visual Studio, and it has a [StudyBotNode_CLI](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/StudyBotNode_CLI) which is the same app but decoupled from Visual Studio and run from the command line. Each app features an embedded bot that you will create in the Azure portal. [Create the bot](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/qna-luis-botv4-node) first, then download one of the Study Bot sample apps to embed your bot into. Follow the readme files for the bot and the apps.

These samples create a Study Bot chat client using [QnA Maker](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/index) (with [Chitchat](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/chit-chat-knowledge-base)) and [LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/). Each query into the chat bot (v4) will be accompanied by relevant search results in an encyclopedia, Microsoft Academic, and a news/blogs section as a study aid. Teachers are able to create their own question and answer FAQs to create a study guide as input for the chat bot if they want it to follow a preferred curriculum. However, demo FAQs are available for this sample, included in the [qna-luis-botv4-node/FAQs folder](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/qna-luis-botv4-node/FAQs). The focus of this app is to enable a more relevant experience of studying, where students can study a subject with a customized chat bot along with multiple web resources.

## Features

* **QnA Maker with LUIS**: There are 3 knowledge bases (created from FAQs in [qnamaker.ai](https://www.qnamaker.ai)) that LUIS directs the user to after a query is received in the chat bot. LUIS has utterances created (in [luis.ai](https://www.luis.ai)) that will allow the right knowledge base to be used. For instance, if the user types in "virus", LUIS knows to go to the biology knowledge base to retrieve a definition (answer) to the user's input. The QnA Maker feature [Chitchat](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/chit-chat-knowledge-base) has been added to the bot v4 as a 4th knowledge base.

* **Speech service**: Through the microphone button in the webchat, this sample can do [Speech-to-Text](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-to-text) and [Text-to-Speech](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/text-to-speech). When a user clicks the microphone button and speaks in their mic, the speech will be printed to the webchat and the bot will respond with an answer that is audible and printed in the webchat.

* The web resources (tabs below the webchat) will take a student query, like "virus", automatically from the webchat queries and return relevant information about it in an encyclopedia, Microsoft Academic, as well as a general Bing search that returns mostly news and blogs on the query.

## Prerequisites

1. Start with the [qna-luis-botv4-node sample](https://github.com/Azure-Samples/cognitive-services-studybot-node/tree/master/qna-luis-botv4-node). Once that is up and running, then download and run the Study Bot app (either the StudyBotNode or StudyBotNode_CLI) sample. The Study Bot depends on the bot you build in the qna-luis-botv4-node sample. Follow the README files in each sample.

1. Visual Studio 2017+ or a command line (CLI)

1. The qna-luis-botv4-node is a Node.js web app bot created in the Azure portal.

1. The StudyBotNode app is a Node/Express Visual Studio app, whereas the StudyBotNode_CLI app uses Express but can be run from the command line.

## Resources

* [QnA Maker Dcoumentation](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/index)
* [QnA Maker API V4.0](https://westus.dev.cognitive.microsoft.com/docs/services/5a93fcf85b4ccd136866eb37/operations/5ac266295b4ccd1554da75ff)
* [Add Chitchat to a QnA Maker knowledge base](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/chit-chat-knowledge-base) - we don't use this method of enabling a knowledge base (KB) with Chitchat in this sample, because we have more than one knowledge base, so we create a stand-alone KB with Chitchat only. If you only have one KB, then it's preferred to enable it in that knowledge base. For more information on the stand-alone Chitchat KB, refer to the [Qna-Luis-Botv4 sample's README](https://github.com/Azure-Samples/cognitive-services-studybot-csharp/blob/master/Qna-Luis-Botv4/README.md).
* [Language Understanding (LUIS) Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
* [LUIS Programmatic APIs v2.0](https://westus.dev.cognitive.microsoft.com/docs/services/5890b47c39e2bb17b84a55ff/operations/5890b47c39e2bb052c5b9c2f)
* [LUIS Endpoint API](https://westus.dev.cognitive.microsoft.com/docs/services/5819c76f40a6350ce09de1ac/operations/5819c77140a63516d81aee78)
* [Azure bot service](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
* [Integrating QnA Maker and LUIS bot v4 tutorial, using Dispatch](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-dispatch?view=azure-bot-service-4.0&tabs=csharp)
* [Speech Services Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/)
* [Bot Framework Web Chat samples](https://github.com/Microsoft/BotFramework-WebChat)
