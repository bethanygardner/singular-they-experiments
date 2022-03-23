//Intro Instructions
newTrial("instructions_start",
    newHtml("instructions_intro", "ins_intro.html")
    ,
    newButton("next", "Start").wait()
)

//Consent form
newTrial("consent",
    newHtml("consent_form", "consent.html")
        .center()
        .print()
    ,
    newText("consent_question", "I have read this informed consent document and the material \
    contained in it has been explained to me verbally. All my questions have been answered, \
    and I freely and voluntarily choose to participate.")
        .css("width", "600px")
        .left()
        .print()
    ,
    newScale("consent_answer", "I want to participate in this study.", 
            "I do not wish to participate in this study.")
        .radio()
        .labelsPosition("right")
        .vertical()
        .css("width", "600px")
        .print()
        .wait()
        .test.selected("I do not wish to participate in this study.")
        .success(
            clear()
            ,
            newText("leave", "You indicated that you did not want to participate in this study, so it will not begin.")
                .print()
            ,
            SendResults()
            ,
            newButton().remove().wait()
        )
) 

//Catch trial 1
newTrial("catch_1",
    newText("catch_text", "Add 2 to 4, and type the answer out in lower-case word form.")
        .print()
    ,
    newTextInput("catch_answer", "")
        .center()
        .lines(0)
        .size(100, 30)
        .print()
    ,
    newButton("next", "Next")
        .print()
        .wait(getTextInput("catch_answer").test.text(/six/))
)

//Catch trial 2
newTrial("catch_2",
    newText("catch2_text", "Type the word that you hear in upper case.")
        .print()
    ,
    newAudio("catch2_audio", "catch_word.mp3")
        .center()
        .print()
        .wait()
    ,
    newTextInput("catch2_answer", "")
        .center()
        .lines(0)
        .size(200, 30)
        .print()
    ,
    newButton("next", "Next")
        .print()
        .wait(getTextInput("catch2_answer").test.text(/LANGUAGE/))
)

newTrial("mic_test",
    newHtml("mic_test", "instructions_2_mic-test.html")
    ,
    newButton("Start")
        .wait()
        .remove()
    ,
    newMediaRecorder("test-mic", "audio")
        .log()
        .print()
        .record()
        .wait()
    ,
    getMediaRecorder("test-mic")
        .wait("playback")
    ,
    newScale("mic_working", "My microphone is working.", 
            "I can't or don't want to record audio.")
        .radio()
        .labelsPosition("right")
        .vertical()
        .css("width", "600px")
        .print()
        .wait()
        .test.selected("I can't or don't want to record audio.")
        .success(
            clear(),
            newText("leave", "You indicated that you can't record audio, so the study will not begin.")
                .print(),
            SendResults(),
            newButton().remove().wait())
    ,
    newButton("next", "Next").wait()
)