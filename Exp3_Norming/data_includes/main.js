//SETUP
PennController.ResetPrefix();
//DebugOff();

//Get prolific ID
Header().log("PROLIFIC_ID", GetURLParameter("PROLIFIC_ID"));

Sequence(
    "preload",
    "consent",
    "catch_trials",
    "example",
    "norming",
    "demographics",
    SendResults(),
    "confirmation_prolific");

//Preload images
CheckPreloaded().label("preload");

//Consent form
newTrial("consent",
    newHtml("consent_form", "perspective-taking_2023.html")
        .center()
        .css("width", "700px")
        .print()
    ,
    newText("consent_question", "I have read this informed consent document and the material \
    contained in it has been explained to me verbally. All my questions have been answered, \
    and I freely and voluntarily choose to participate.")
        .center()
        .css("width", "800px")
        .print()
    ,
    newScale("consent_answer", "I want to participate in this study.", 
            "I do not wish to participate in this study.")
        .radio()
        .labelsPosition("right")
        .vertical()
        .center()
        .css("width", "800px")
        .print()
        .wait()
        .test.selected("I do not wish to participate in this study.")
        .success(
            clear(),
            newText("leave", "You indicated that you did not want to participate in this study, so it will not begin."),
            SendResults(),
            newButton().remove().wait()
        )
); 

//Catch trials
newTrial("catch_trials",
    newText("catch1_text", "Add 2 to 4, and type the answer out in lower-case word form.")
        .center().print()
    ,
    newTextInput("catch_answer", "")
        .center()
        .lines(0)
        .size(100, 30)
        .print()
    ,
    newText("catch2_text", "Type the word that you hear in upper case.")
        .center()
        .css("margin-top", "50px")
        .css("margin-bottom", "15px")
        .print()
    ,
    newAudio("catch2_audio", "catch_word.mp3")
        .center()
        .print()
    ,
    newTextInput("catch2_answer", "")
        .center()
        .lines(0)
        .size(200, 30)
        .print()
    ,
    newButton("next", "Next")
        .print()
        .wait(getTextInput("catch_answer").test.text(/six/)
        .and(getTextInput("catch2_answer").test.text(/LANGUAGE/)))
        
);

//Example
newTrial("example",
    newText("In this study, you will see pictures of people and the beginning of a sentence. Your job is to write an ending to the sentence. Here's an example.")
        .css("width", "600px")
        .center()
        .print()
    ,
    newImage("i", "fem2.png")
        .size(400,400)
        .center()
        .print()
        .log()
    ,
    newText("This person got into bed. Before falling asleep...")
        .css("width", "600px")
        .center()
        .print()
    ,
	newText("...they checked Twitter.")
        .css("width", "600px")
        .center()
        .print()
    ,
    newButton("Next")
        .print()
        .wait()
);

//Sentence completions
Template("stim-norming.csv", row=>
    newTrial("norming",
        newText("Please write an ending to the sentence in a way that makes sense to you.")
            .css("width", "600px")
            .center()
            .print()
        ,
        newImage("i", row.image)
            .size(400,400)
            .center()
            .print()
        ,
        newText("p", row.prompt)
            .css("width", "600px")
            .center()
            .print()
        ,
        newTextInput("c")
            .css("width", "600px")
            .center()
            .print()
            .log()
        ,
        newButton("Next")
            .print()
            .wait(getTextInput("c").test.text(/^(?!\s*$).+/))
    )
    .log("List", row.list)
    .log("Image", row.image)
    .log("Prompt", row.prompt)
);

//Demographics
newTrial("demographics",
    newText("instructions", "To wrap up, please answer these demographic questions.")
        .css("width", "700px")
        .left()
        .print()
    ,
    newText("age", "Age:")
        .css("width", "150px")
        .left()
    ,
    newTextInput("enter_age", "")
        .before(getText("age"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newText("gender", "Gender:")
        .css("width", "150px")
        .left()
    ,
    newTextInput("enter_gender", "")
        .before(getText("gender"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newText("english", "Please rate your overall ability in the English language:")
        .css("width", "700px")
        .left()
        .print()
    ,
    newScale("enter_english", "Native (learned from birth)",
    "Fully competent in speaking, listening, reading, and writing, but not native", 
    "Limited but adequate competence in speaking, reading, and writing", 
    "Restricted ability (e.g. only reading or speaking/listening)", 
    "Some familiarity (e.g. a year of instruction in school)")
        .radio()
        .labelsPosition("right")
        .css("width", "700px")
        .vertical()
        .print()
        .log()
    ,
    newButton("next", "Next")
        .print()
        .wait(getTextInput("enter_age").test.text(/^(?!\s*$).+/)
            .and(getTextInput("enter_gender").test.text(/^(?!\s*$).+/))
            .and(getScale("enter_english").test.selected()))
);

//Validation 
newTrial("confirmation_prolific" ,
    newText("<p>Thank you for your participation!</p>")
        .center().print()
    ,

    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=B4FECB6B'>Click here to validate your submission</a></p>")
        .center().print()
    ,
    newButton("void")
        .wait()
);