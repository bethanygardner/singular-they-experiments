/*
TO DO:
 - New consent form
 - Validation for prolific: https://doc.pcibex.net/how-to-guides/using-prolific/
 
 - Set up link to save audio
 - Different validation procedure for prolific?

 - Audio for example trials
 - Turn debug off 
*/
PennController.ResetPrefix(null) 

Sequence(
	//SETUP
    "preload",             //Preload images
    "instructions_start",  //Instructions about the study
    "catch_trials",        //Catch trials
    "consent",             //Consent form
    "init",                //Get microphone permission
    "mic_test",            //Test microphone
	//ATTITUDE QUESTIONS
	"rate_sentences",      //Acceptability/naturalness judgments
	"they_familiarity",    //Familiarity with singular they
	"transphobia_scale",   //Gender essentialism/binary attitudes
	//EXPERIMENT
    "instructions_characters",      //Introduce characters
    randomize("characters"), 
    "instructions_example_trials",  //Example trials
    randomize("trials_example"),
    "instructions_practice",        //Practice trials
    sepWith("sync", randomize("trials_practice")),
    "instructions_test",            //Test trials
    sepWith("sync", randomize("trials_test")),
    //DEMOGRAPHICS, END
    "demographics",         //Demographics questions
    SendResults(),          //Send results
    "validation"            //Validation instructions <- right now has download recording option
);

//Generate unique participant code
code = (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))();

//Replace the URL with one that points to a PHP file on your own webserver
InitiateRecorder("https://my.server/path/to/file.php").label("init");

//Trial to upload recordings, then continue automatically.
UploadRecordings("sync","noblock")

//Preload images
CheckPreloaded().label("preload");

//Default formatting
Header(
    defaultHtml
        .center()
        .print(),
    defaultButton
        .center()
        .print(),
    defaultText
        .print()
);