//Demographics questions: age, gender, race, ethnicity, English, familiarity with singular they
newTrial("demographics",
    newText("instructions", "To wrap up, please answer these demographic questions.")
        .css("width", "700px")
        .css("margin-bottom", "15px")
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
    newText("race", "Race:")
        .css("width", "700px")
        .css("margin-top", "15px")
    ,
    newScale("enter_race", 
        "option1",
        "option2", 
        "option3")
        .checkbox()
        .labelsPosition("right")
        .css("width", "700px")
        .vertical()
        .print()
        .log()
    ,
    newText("ethnicity", "Ethnicity:")
        .css("width", "700px")
        .css("margin-top", "15px")
    ,
    newScale("enter_ethnicity",
        "Hispanic/Latino",
        "Not Hispanic/Latino")
        .radio()
        .labelsPosition("right")
        .css("width", "700px")
        .vertical()
        .print()
        .log()
    ,
    newText("english", "Please rate your overall ability in the English language:")
        .css("width", "700px")
        .css("margin-top", "15px")
    ,
    newScale("enter_english", 
        "Native (learned from birth)",
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
    newText("they", "Some people use they/them pronouns instead of he/him or she/her pronouns. An example of this is 'Alex raised their hand.'")
        .css("width", "700px")
        .css("margin-top", "15px")
    ,
    newScale("enter_they", 
        "I use they/them pronouns for myself.",
        "I am close to someone who uses they/them pronouns.", 
        "I have met someone who uses they/them pronouns.",
        "I have heard about people using they/them pronouns, but have not met someone who does.",
        "I have not heard about people using they/them pronouns.")
        .checkbox()
        .labelsPosition("right")
        .css("width", "700px")
        .vertical()
        .print()
        .log()
    ,
    newButton("next", "Next")
        .print()
        .wait(getTextInput("enter_age").test.text(/\d+/)
            .and(getTextInput("enter_gender").test.text(/\w+/))
            .and(getScale("enter_race").test.selected())
            .and(getScale("enter_ethnicity").test.selected())
            .and(getScale("enter_english").test.selected())
            .and(getScale("enter_they").test.selected()))
)

//Validation instructions
newTrial("validation_1",
    newText("turkID", "MTurk ID:")
        .css("width", "150px")
    ,
    newTextInput("enter_turkID", "")
        .before(getText("turkID"))
        .css("width", "300px")
        .print()
        .log()
    ,
    newHtml("validation", "ins_validation.html")
    ,
    newButton("next", "Get validation code")
        .wait(getTextInput("enter_turkID").test.text(/^(?!\s*$).+/))
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