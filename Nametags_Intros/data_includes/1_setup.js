PennController.ResetPrefix(null) 
//Turn debug off later

Sequence("instructions_start",  //Instructions about the study
         "consent",             //Consent form
         "catch_1", "catch_2",  //Catch trials  
         "init",                //Get microphone permission
         "mic_test",             //Test microphone
         "demographics",
         "validation_1", "validation_2"
         )

//Generate unique participant code
code = (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))()

//Replace the URL with one that points to a PHP file on your own webserver
InitiateRecorder("https://my.server/path/to/file.php").label("init")

//Trial to upload recordings. Add "noblock" back in as second command to continue automatically.
UploadRecordings("async")

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
)