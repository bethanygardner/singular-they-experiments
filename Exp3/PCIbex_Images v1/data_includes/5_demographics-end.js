//Demographics questions: age, sex, gender, sexuality
//race, ethnicity, education, English ability

newTrial("demographics",
    newText("To wrap up, please answer these demographic questions.")
        .css({"width":"700px", "margin-top":"20px", "margin-bottom":"20px"})
		.center()
	,
	newText("Age:")
        .css({"width":"700px", "margin-top":"20px"})
		.center()
    ,
    newTextInput("enter_age", "")
        .css("width", "200px")
        .cssContainer({"width":"700px" , "margin-top":"5px"})
        .center()
        .print()
        .log()
    ,
    newText("What sex were you assigned at birth, on your original birth certificate?")
        .css({"width":"700px", "margin-top":"20px"})
        .center()
    ,        
    newScale("enter_sex", 
        "Female",
        "Male",
        "I don't understand what this means",
        "Prefer not to answer")
        .radio() 
        .labelsPosition("right")
        .vertical()
        .cssContainer("width", "700px")
        .center()
        .print()
        .log()
    ,
    newText("What is your current gender?")
        .css({"width":"700px", "margin-top":"20px"})
		.center()
    ,
    newTextInput("enter_gender", "")
        .css("width", "200px")
        .cssContainer({"width":"700px" , "margin-top":"5px"})
        .center()
        .print()
        .log()
    ,    
    newText("How do you describe your sexuality?")
        .css("width", "700px")
		.css("margin-top", "20px")
		.center()
    ,
    newScale("enter_sexuality",
        "Asexual", "Bisexual/Pansexual", "Gay/Lesbian",
        "Heterosexual/Straight", "Queer", "Questioning",
        "Prefer not to answer")
        .checkbox()
        .vertical()
        .center()
        .print()
        .cssContainer("width", "700px")
        .log()
    ,
    newTextInput("sexuality_writein", "") 
        .before(newText("I use a different term:").css("width", "200px"))
        .css("width", "300px")
        .cssContainer({"width":"700px", "margin-top":"5px"})
        .center()
        .print()
        .print()
        .log()
	,
    newText("race", "Race:")
        .css("width", "700px")
		.css("margin-top", "20px")
		.center()
    ,
    newScale("enter_race", 
        "American Indian or Alaska Native", "Asian",
        "Black or African American", "Native Hawaiian or Pacific Islander",
        "Other", "Prefer not to answer")
        .checkbox()
        .labelsPosition("right")
        .vertical()
        .cssContainer("width", "700px")
        .center()
        .print()
        .log()
    ,
    newTextInput("enter_race_writein", "")
        .before(newText("I use a different term:").css("width", "200px"))
        .css("width", "300px")
        .cssContainer({"width":"700px", "margin-top":"5px"})
        .center()
        .print()
        .print()
        .log()
    ,
    newText("ethnicity", "Ethnicity:")
        .css("width", "700px")
		.css("margin-top", "20px")
		.center()
    ,
    newScale("enter_ethnicity",
        "Hispanic/Latino", "Not Hispanic/Latino", "Prefer not to answer")
        .radio()
        .labelsPosition("right")
        .vertical()
        .cssContainer("width", "700px")
        .center()
        .print()
        .log()
    ,
    newText("What is your highest education level?")
        .css("width", "700px")
		.css("margin-top", "20px")
		.center()
	,
	newScale("enter_ed",
	    "Less than high school", "High school graduate", "Some college",  
        "2 year degree", "4 year degree", "Professional degree",
        "Doctorate", "Prefer not to answer")
        .radio()
        .labelsPosition("right")
        .vertical()
        .cssContainer("width", "700px")
        .center()
        .print()
        .log()
    ,
    newText("english", "Please rate your overall ability in the English language:")
        .css("width", "700px")
		.css("margin-top", "20px")
		.center()
    ,
    newScale("enter_english", 
        "Native (learned from birth)",
        "Fully competent in speaking, listening, reading, and writing, but not native", 
        "Limited but adequate competence in speaking, reading, and writing", 
        "Restricted ability (e.g. only reading or speaking/listening)", 
        "Some familiarity (e.g. a year of instruction in school)")
        .radio()
        .labelsPosition("right")
        .vertical()
        .cssContainer("width", "700px")
        .center()
        .print()
        .log()
    ,
    newButton("Next")
        .wait(getTextInput("enter_age").test.text(/\d+/)
            .and(getTextInput("enter_gender").test.text(/\w+/))
            .and(getScale("enter_trans").test.selected())
            .and(getScale("enter_sexuality").test.selected)
            .and(getScale("enter_race").test.selected())
            .and(getScale("enter_ethnicity").test.selected())
            .and(getScale("enter_english").test.selected())
            .and(getScale("enter_ed").test.selected()))
);

//Validation instructions
newTrial("validation",
    newText("Add Prolific validation: https://doc.pcibex.net/how-to-guides/using-prolific/")
    ,
    newText("download", DownloadRecordingButton("Click here to download the recordings."))
        .print()
    ,
    newButton("End").wait()
);

code=undefined