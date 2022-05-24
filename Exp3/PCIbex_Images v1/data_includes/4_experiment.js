//Introduce characters 
newTrial("instructions_characters",
    newHtml("instructions_characters", "ins_characters.html"),
    newButton("Start").wait()
);

Template("stim-char.csv", row=>
    newTrial("characters", 
        //Load images
        newImage("char", row.target_file).size(400,400),
        newImage("brother", row.brother).size(400,400),
        newImage("sister", row.sister).size(400,400)
        ,
        //Character
        newCanvas("screen", 1100, 400)  //Character image
            .center()
            .add("center at 50%", "middle at 50%", getImage("char"))
            .print(),
        newTimer("timer1s", 1000)      //Wait for 1s
            .start()
            .wait(),
        newText("text1",               //"This is _ (who uses __ pronouns)."
            row.text1_name + row.text1_pronouns)
            .center()
            .css("font-size", "2em")
            .css("margin-top", "25px"),  
        newTimer("timer2s", 2000)     //Wait for 2s
            .start()
            .wait(),
        newButton("next1", "Next")   //Move to next screen
            .wait()
            .remove(),      
        getImage("char").remove(),
        getText("text1").remove(),
        
        //Brother
        getCanvas("screen")            //Character and brother images
            .add("center at 30%", "middle at 50%", getImage("char"))
            .add("center at 70%", "middle at 50%", getImage("brother"))
            .refresh(),
        getTimer("timer1s")            //Wait for 1s
            .start()
            .wait(),                  //[pronoun] has/have a brother
        newText("text2", row.text2_brother)
            .center()
            .css("font-size", "2em")
            .css("margin-top", "25px"),  
        getTimer("timer2s")           //Wait for 2s
            .start()
            .wait(), 
        newButton("next2", "Next")    //Move to next screen
            .wait()
            .remove(),
        getImage("brother").remove(),
        getText("text2").remove(),
        
        //Sister
        getCanvas("screen")            //Sister image
            .add("center at 70%", "middle at 50%", getImage("sister"))
            .refresh(),
        getTimer("timer1s")            //Wait for 1s
            .start()
            .wait(),                   //"[pronoun] has/have a sister"
        newText("text3", row.text3_sister)
            .center()
            .css("font-size", "2em")
            .css("margin-top", "25px"),  
        getTimer("timer2s")           //Wait for 2s
            .start()
            .wait(), 
        newButton("Next").wait()      //Move to next trial
    )
    //Log trial variables
    .log("trial_id", row.trial_id)
	.log("group", row.group)
    .log("target_pronoun", row.target_pronoun)
    .log("target_file", row.target_file)
    .log("brother", row.brother)
    .log("sister", row.sister)
);

//Example trials 
newTrial("instructions_example_trials",
    newHtml("instructions_example_trials", "ins_trials-example.html"),
    newButton("Start").wait()
);

Template("stim-example.csv", row =>
    newTrial("trials_example",
        //Load images
        newImage("target", row.target_file).size(300,300),
        newImage("distractor", row.distractor_file).size(300,300),
        newImage("Object", row.object_image).size(150,150),
        newImage("sib_top-left", row.top_left).size(200,200),
        newImage("sib_bottom-left", row.bottom_left).size(200,200),
        newImage("sib_top-right", row.top_right).size(200,200),
        newImage("sib_bottom-right", row.bottom_right).size(200,200)
        ,
        //Display scene for 3s
        newCanvas("screen", 1100, 700)
            .center()
            .add("center at " + row.target_x + "%",      //target on left or right
                 "middle at 50%", getImage("target"))
            .add("center at " + row.distractor_x + "%",  //distractor on left or right
                 "middle at 50%", getImage("distractor"))
            .add("center at " + row.object_x + "%",      //object starts on same side as target
                 "middle at 50%", getImage("Object"))
            .add(0, 0, getImage("sib_top-left"))
            .add(0, 500, getImage("sib_bottom-left"))
            .add(900, 0, getImage("sib_top-right"))
            .add(900, 500, getImage("sib_bottom-right"))
            .print(),
        newTimer("timer3000", 3000).start().wait()
        ,
        //Move object image from character to sibling
        getCanvas("screen")             //put in second location for 500ms
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y2 + "%", getImage("Object"))
            .refresh(),  
        newTimer("timer500", 500).start().wait(),
        getCanvas("screen")            //put in third location for 500ms
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y3 + "%", getImage("Object"))
            .refresh(),
        getTimer("timer500").start().wait(),
        getCanvas("screen")           //put in fourth location 
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y4 + "%", getImage("Object"))
            .refresh(),
        getTimer("timer500").start().wait()
        ,
        //Play audio of correct answer but printing text now
        newText("feedback", "AUDIO: " + row.correct_description)
            .center()
            .css("font-size", "2em")
            .css("margin-top", "25px")  ,
        getTimer("timer3000").start().wait()
        ,
        //Move on to next trial
        newButton("Next").wait()
    )
    //Log trial variables
    .log("trial_id", row.trial_id)
	.log("group", row.group)
    .log("target_pronoun", row.target_pronoun)
    .log("correct_description", row.correct_description)
);

//Practice trials 
newTrial("instructions_practice",
    newHtml("instructions_practice", "ins_trials-practice.html"),
    newButton("Start").wait()
);

Template("stim-practice.csv", row =>
    newTrial("trials_practice",
        //Load images
        newImage("target", row.target_file).size(300,300),
        newImage("distractor", row.distractor_file).size(300,300),
        newImage("Object", row.object_image).size(150,150),
        newImage("sib_top-left", row.top_left).size(200,200),
        newImage("sib_bottom-left", row.bottom_left).size(200,200),
        newImage("sib_top-right", row.top_right).size(200,200),
        newImage("sib_bottom-right", row.bottom_right).size(200,200)
        ,
        //Display scene for 3s
        newCanvas("screen", 1100, 700)
            .center()
            .add("center at " + row.target_x + "%",      //target on left or right
                 "middle at 50%", getImage("target"))
            .add("center at " + row.distractor_x + "%",  //distractor on left or right
                 "middle at 50%", getImage("distractor"))
            .add("center at " + row.object_x + "%",      //object starts on same side as target
                 "middle at 50%", getImage("Object"))
            .add(0, 0, getImage("sib_top-left"))
            .add(0, 500, getImage("sib_bottom-left"))
            .add(900, 0, getImage("sib_top-right"))
            .add(900, 500, getImage("sib_bottom-right"))
            .print(),
        newTimer("timer3000", 3000).start().wait()
        ,
        //Move object image from character to sibling
        getCanvas("screen")             //put in second location for 500ms
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y2 + "%", getImage("Object"))
            .refresh(),  
        newTimer("timer500", 500).start().wait(),
        getCanvas("screen")            //put in third location for 500ms
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y3 + "%", getImage("Object"))
            .refresh(),
        getTimer("timer500").start().wait(),
        getCanvas("screen")           //put in fourth location 
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y4 + "%", getImage("Object"))
            .refresh()
        ,    
        //Record audio for 8 seconds
        newMediaRecorder(row.trial_id + "_" + row.target_pronoun, "audio")
            .log()
            .record()
        ,
        newTimer("timer8000", 8000)
            .start()
            .wait()
        ,
        getMediaRecorder(row.trial_id + "_" + row.target_pronoun)
            .stop()
        ,
        //Play audio of correct correct_description
        newText("feedback", "AUDIO: Did you say, '" + row.correct_description + "?'")
            .center()
            .css("font-size", "2em")
            .css("margin-top", "25px")  
            .css("width", "1100px")
        ,
        newTimer("timer3s", 3000).start().wait(),
        //Move on to next trial
        newButton("Next").wait()
    )
    //Log trial info
    .log("trial_id", row.trial_id)
	.log("group", row.group)
    .log("target_pronoun", row.target_pronoun)
    .log("correct_description", row.correct_description)
);

//Critical trials [randomized order in Sequence()]
Template("stim-test.csv", row =>
    newTrial("trials_test",
		//Load images
        newImage("target", row.target_file).size(300,300),
        newImage("distractor", row.distractor_file).size(300,300),
        newImage("Object", row.object_image).size(150,150),
        newImage("sib_top-left", row.top_left).size(200,200),
        newImage("sib_bottom-left", row.bottom_left).size(200,200),
        newImage("sib_top-right", row.top_right).size(200,200),
        newImage("sib_bottom-right", row.bottom_right).size(200,200)
        ,
        //Display scene for 3s
        newCanvas("screen", 1100, 700)
            .center()
            .add("center at " + row.target_x + "%",      //target on left or right
                 "middle at 50%", getImage("target"))
            .add("center at " + row.distractor_x + "%",  //distractor on left or right
                 "middle at 50%", getImage("distractor"))
            .add("center at " + row.object_x + "%",      //object starts on same side as target
                 "middle at 50%", getImage("Object"))
            .add(0, 0, getImage("sib_top-left"))
            .add(0, 500, getImage("sib_bottom-left"))
            .add(900, 0, getImage("sib_top-right"))
            .add(900, 500, getImage("sib_bottom-right"))
            .print(),
        newTimer("timer3000", 3000).start().wait()
        ,
        //Move object image from character to sibling
        getCanvas("screen")             //put in second location for 500ms
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y2 + "%", getImage("Object"))
            .refresh(),  
        newTimer("timer500", 500).start().wait(),
        getCanvas("screen")            //put in third location for 500ms
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y3 + "%", getImage("Object"))
            .refresh(),
        getTimer("timer500").start().wait(),
        getCanvas("screen")           //put in fourth location 
            .add("center at " + row.object_x + "%", 
                 "middle at " + row.object_y4 + "%", getImage("Object"))
            .refresh()
        ,    
        //Record audio for 8 seconds
        newMediaRecorder(row.trial_id + "_" + row.target_pronoun, "audio")
            .log()
            .record()
        ,
        newTimer("timer8000", 8000)
            .start()
            .wait()
        ,
        getMediaRecorder(row.trial_id + "_" + row.target_pronoun)
            .stop()
        ,
        newTimer("timer3s", 3000).start().wait(),
        //Move on to next trial
        newButton("Next").wait()
    )
    //Log trial variables
    .log("trial_id", row.trial_id)
	.log("group", row.group)
    .log("target_pronoun", row.target_pronoun)
    .log("correct_description", row.correct_description)
);