//SETUP
PennController.ResetPrefix(null) 

Sequence(
    "intro", "consent_form",
    "init", "mic_test", 
    "instructions_psa", "PSA",
    "instructions_story", "Story1", "Story2",
    "instructions_character", "character",
    "instructions_math", "math",
    "instructions_memory", "memory",
    "instructions_production", "production", //add async trials
    "demographics", "validation_1", "validation_2"
)

//Replace the URL with one that points to a PHP file on your own webserver
InitiateRecorder("https://my.server/path/to/file.php").label("init")

//Trial to upload recordings. Add "noblock" back in as second command to continue automatically.
UploadRecordings("async")

//Unique participant code
code = (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))()

//Defaults
Header(
    defaultHtml
        .center()
        .print(),
    defaultButton
        .center()
        .print(),
    defaultText
        .print()
)

//INTRODUCTION 
newTrial("intro",
    newHtml("instructions_intro", "instructions_1_intro.html")
    ,
    newButton("next", "Start").wait()
)

//CONSENT FORM
newTrial("consent_form",
    newHtml("consent", "consent.html")
    ,
    newText("consent_question", "I have read this informed consent document and the material \
    contained in it has been explained to me verbally. All my questions have been answered, \
    and I freely and voluntarily choose to participate.")
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
            clear(),
            newText("leave", "You indicated that you did not want to participate in this study, so it will not begin.")
                .print(),
            SendResults(),
            newButton().remove().wait()
        )
) 

//TEST RECORDING
newTrial("mic_test",
    newHtml("mic_test", "instructions_2_mictest.html")
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

//PSA 
newTrial("instructions_psa",
    newHtml("instructions_psa", "instructions_3_psa.html")
    ,
    newButton("next", "Next")
        .wait()
)

Template("stimuli_training.csv", row =>
    newTrial("PSA",
        newHtml("PSA_text", row.psa)
        ,
        newTimer("wait", "20000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .wait()
    ) 
)

//STORY
newTrial("instructions_story",
    newHtml("instructions_story", "instructions_4_story.html")
    ,
    newButton("next", "Next")
        .wait()
)

Template("stimuli_training.csv", row =>
    newTrial("Story1",
        newHtml("story1_text", row.story1)
        ,
        newTimer("wait", "20000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .wait()
    ) 
)

//Story 2
Template("stimuli_training.csv", row =>
    newTrial("Story2",
        newHtml("story2_text", row.story2)
        ,
        newTimer("wait", "20000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .wait()
    ) 
)

//CHARACTERS
newTrial("instructions_character",
    newHtml("instructions_character", "instructions_5_character.html")
    ,
    newButton("next", "Next")
        .wait()
)

Template("stimuli_characters.csv", row => 
    newTrial("character",
        newText("stim", row.introduction)
            .center()
        ,
        newTimer("wait", "2000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .wait() 
    )
)

//MATH
newTrial("instructions_math",
    newHtml("instructions_math", "instructions_6_math.html")
    ,
    newButton("next", "Next")
        .wait()
)
Template("math.csv", row =>
    newTrial("math",
        newText("question", row.question)
        ,
        newTextInput("answer", "")
            .before(getText("question"))
            .center()
            .lines(0)
            .size(100, 30)
            .print()
            .log()
        ,
        newButton("next", "Next")
            .wait(getTextInput("answer").test.text(/^(?!\s*$).+/))
    )
)

//MEMORY
newTrial("instructions_memory",
    newHtml("instructions_memory", "instructions_7_memory.html")
    ,
    newButton("next", "Next")
        .wait()
)

Template("stimuli_characters.csv", row =>
    newTrial("memory",
        defaultText
            .css("width", "350px")
            .css("margin-left", "100px")
        ,
        newText("job_prompt", row.memory_job)
        ,
        newDropDown("job_answers", "")
            .add("engineer", "Uber driver", "food service", "mechanic", "teacher", "accountant", 
            "retail", "janitor", "IT", "nurse", "doctor", "sales")
            .before(getText("job_prompt"))
            .shuffle()
            .print()
            .log()
        ,
        newText("pet_prompt", row.memory_pet)
        ,
        newDropDown("pet_answers", "")
            .add("cat", "dog", "fish")
            .before(getText("pet_prompt"))
            .shuffle()
            .print()
            .log()
        ,
        newText("pronoun_prompt", row.memory_pronoun)
        ,
        newDropDown("pronoun_answers", "")
            .add("he/him", "she/her", "they/them")
            .before(getText("pronoun_prompt"))
            .shuffle()
            .print()
            .log()
        ,
        newButton("next", "Next")
            .wait(getDropDown("job_answers").test.selected() 
                .and(getDropDown("pet_answers").test.selected()) 
                .and(getDropDown("pronoun_answers").test.selected())) 
    )
    .log("list", row.group)
    .log("condition", row.condition)
    .log("name", row.name)
    .log("pronoun", row.pronoun)
    .log("job", row.job)
    .log("pet", row.pet)
    .log("subj_code", code)
)

//PRODUCTION
newTrial("instructions_production",
    newHtml("instructions_production", "instructions_8_production.html")
    ,
    newButton("next", "Next")
        .wait()
)
Template("stimuli_characters.csv", row =>
    newTrial("production",
        newText("instruction", "Read the beginning of the sentence out loud, and finish it in a way that makes sense to you.<br><br>")
        ,
        newText("prompt", row.production)
        ,
        newButton("Start Recording")
            .remove(),
        newMediaRecorder(row.pronoun+"-sentence", "audio")
            .log()
            .record()
            .print()
            .wait(),
        newButton("next", "Next")
            .wait()
    )
    .log("list", row.group)
    .log("condition", row.condition)
    .log("name", row.name)
    .log("pronoun", row.pronoun)
    .log("job", row.job)
    .log("pet", row.pet)
    .log("subj_code", code)
)

//DEMOGRAPHICS
newTrial("demographics",
    newText("instructions", "To wrap up, please answer these demographic questions.")
        .css("width", "700px")
    ,
    newText("age", "Age:")
        .css("width", "150px")
    ,
    newTextInput("enter_age", "")
        .before(getText("age"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newText("gender", "Gender:")
        .css("width", "150px")
    ,
    newTextInput("enter_gender", "")
        .before(getText("gender"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newText("english", "Please rate your overall ability in the English language:")
        .css("width", "700px")
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
    newText("turkID", "MTurk ID:")
        .css("width", "150px")
    ,
    newTextInput("enter_turkID", "")
        .before(getText("turkID"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newButton("next", "Next")
        .print()
        .wait(getTextInput("enter_age").test.text(/\d+/)
            .and(getTextInput("enter_gender").test.text(/\w+/))
            .and(getTextInput("enter_turkID").test.text(/^(?!\s*$).+/))
            .and(getScale("enter_english").test.selected()))
)

//VALIDATION
newTrial("validation_1",
    newHtml("validation", "instructions_9_validation.html")
    ,
    newButton("next", "Get validation code")
        .wait()
)
newTrial("validation_2",
    newText("Your code is: ")
    ,
    newText(code)
        .bold()
    ,
    newButton("next", "Finish")
        .wait()
)
code=undefined