PennController.ResetPrefix(null) // Keep here
DebugOff()


Sequence("Consent",                                          //Consent form
        "instructions_psa", "PSA",                           //PSA 
        "instructions_story", "Story1", "Story2",            //Story 1, Story 2
        "instructions_character", randomize("character"),    //Introduce character (random order)
        "instructions_math", randomize("math"),              //Math questions (random order)
        "instructions_memory", randomize("memory"),          //Memory questions (random order grouped by character)
        "instructions_production", randomize("production"),  //Production questions (random order)
        "demographics", "validation")                        //Demographics, validation

//Consent form
newTrial("Consent",
    newHtml("Consent", "consent.html")
        .center()
        .print()
    ,
    newButton("Agree", "I want to participate in this study")
        .print()
        .wait()
) 

//Instructions: PSA 
newTrial("instructions_psa",
    newText("instructions", "This is a pilot version of a new study. Please complete it in \
    in one setting, so we can see how long it takes. <br><br> In this study, you will read \
    three different kinds of texts. Please read each one carefully. <br><brFirst, you'll see an informational article.")
        .print()
    ,
    newButton("next", "Next")
        .print()
        .wait()
)

//PSA 
Template("stimuli_training.csv", row =>
    newTrial("PSA",
        newHtml("PSA_text", row.psa)
            .print()
        ,
        newTimer("wait", "20000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .print()
            .wait()
    ) 
)

//Instructions: stories
newTrial("instructions_story",
    newText("instructions", "Next, please read the following short biographies.")
        .print()
    ,
    newButton("next", "Next")
        .print()
        .wait()
)

//Story 1
Template("stimuli_training.csv", row =>
    newTrial("Story1",
        newHtml("story1_text", row.story1)
            .print()
        ,
        newTimer("wait", "20000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .print()
            .wait()
    ) 
)

//Story 2
Template("stimuli_training.csv", row =>
    newTrial("Story2",
        newHtml("story2_text", row.story2)
            .print()
        ,
        newTimer("wait", "20000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .print()
            .wait()
    ) 
)

//Instructions: introduce characters
newTrial("instructions_character",
    newText("instructions", "Now, you're going to meet 12 different people. For each person, \
    you'll see their name and a few facts about them. Please read these descriptions carefully.")
        .print()
    ,
    newButton("next", "Next")
        .print()
        .wait()
)

//Characters
Template("stimuli_characters.csv", row => 
    newTrial("character",
        newText("stim", row.introduction)
            .center()
            .print()
        ,
        newTimer("wait", "3000")
            .start()
            .wait()
        ,
        newButton("next", "Next")
            .print()
            .wait() 
    )
) 

//Instructions: math 
newTrial("instructions_math",
    newText("instructions", "In the following section, you will be asked to solve a series \
    of math questions.  Please do your best to arrive at the correct answer.  You may use \
    scratch paper, but no calculators.")
        .print()
    ,
    newButton("start", "Next")
        .print()
        .wait()
)

//Math
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
            .print()
            .wait(getTextInput("answer").test.text(/^(?!\s*$).+/))
    )
)

//Instructions: memory
newTrial("instructions_memory",
    newText("instructions", "Now, we're going to ask some questions about the people you met. \
    Please answer, trying to remember as best you can. If you can't remember, please make \
    your best guess.")
        .center()
        .print()
    ,
    newButton("start", "Next")
        .print()
        .wait()
)

//Memory
Template("stimuli_characters.csv", row =>
    newTrial("memory",
        defaultText
            .css("width", "350px")
            .left()
            .print()
        ,
        newText("job_prompt", row.memory_job)
        ,
        newDropDown("job_answers", "")
            .add("engineer", "uber driver", "food service", "mechanic", "teacher", "accountant", 
            "retail", "janitor", "IT", "nurse", "doctor", "salesperson")
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
            .print()
            .wait(getDropDown("job_answers").test.selected(), 
                  getDropDown("pet_answers").test.selected(), 
                  getDropDown("pronoun_answers").test.selected()) 
    )
    .log("list", row.group)
    .log("condition", row.condition)
    .log("name", row.name)
    .log("pronoun", row.pronoun)
    .log("job", row.job)
    .log("pet", row.pet)
)

//Instructions: production
newTrial("instructions_production",
    newText("instructions", "Next, you will see the beginning of a sentence. Please write \
    an ending to the sentence in a way that makes sense to you. <br><br>For example: \
    <br><br>After Thomas got home from working as a personal trainer... \
    <br>...he made dinner.")
        .left()
        .print()
    ,
    newButton("start", "Next")
        .print()
        .wait()
)

//Production
Template("stimuli_characters.csv", row =>
    newTrial("production",
        defaultText
            .left()
            .css("width", "450px")
            .print()
        ,
        newText("instruction", "Please write an ending to the sentence in a way that makes sense to you.")
        ,
        newText("prompt", row.production)
        ,
        newTextInput("sentence", "")
            .lines(0)
            .size(425, 100)
            .print()
            .log()
        ,
        newButton("next", "Next")
            .print()
            .wait(getTextInput("sentence").test.text(/^(?!\s*$).+/))
    )
    .log("list", row.group)
    .log("condition", row.condition)
    .log("name", row.name)
    .log("pronoun", row.pronoun)
    .log("job", row.job)
    .log("pet", row.pet)
)

//Demographics
newTrial("demographics",
    newText("instructions", "To wrap up, please answer these demographic questions.")
        .css("width", "700px")
        .left()
        .print()
    ,
    newText("age", "Age:")
        .css("width", "75px")
        .left()
    ,
    newTextInput("enter_age", "")
        .before(getText("age"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newText("gender", "Gender:")
        .css("width", "75px")
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
        .wait(getTextInput("enter_age").test.text(/^(?!\s*$).+/),
              getTextInput("enter_gender").test.text(/^(?!\s*$).+/),
              getScale("enter_english").test.selected())
)

//Validation 
//Instructions: PSA 
newTrial("validation",
    newText("validation", "Thank you for participating in this study! To receive credit, \
    send an email to bethanyhgardner@gmail.com with the word PRONOUN_PILOT. <br> <br>\
    This is a pilot version of a new study. If you saw any errors, please let us know!")
        .print()
    ,
    newButton("next", "Finish")
        .print()
        .wait()
)