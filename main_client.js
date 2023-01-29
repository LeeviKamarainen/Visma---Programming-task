const URI_identification =  require("./URI_identification.js")

function main_client() {
        // Defines the client which will use the URI_identification class.
        let test_URI = 'visma-identity://login?source=severa';
        let test_URI2 = 'visma-identity://confirm?source=netvisor&paymentnumber=102226';
        let test_URI3 = 'visma-identity://sign?source=vismasign&documentid=105ab44'
        let invalid_URI = 'vima-identity://loggin?sorce=severa'; // Depending on which part of the URI is invalid, the returned paths and parameteres will be different.
    
        //Creating the URI_identification objects
        let URI_class1 = new URI_identification(test_URI);
        let URI_class2 = new URI_identification(test_URI2);
        let URI_class3 = new URI_identification(test_URI3);
        let URI_class_invalid = new URI_identification(invalid_URI);

     
        // Testing the different URIs:
        console.log("PATH 1: "+URI_class1.path)
        console.log("SOURCE 1: "+JSON.stringify(URI_class1.parameters)+"\n")

        
        console.log("PATH 2: "+URI_class2.path)
        console.log("SOURCE 2: "+JSON.stringify(URI_class2.parameters)+"\n")

        
        console.log("PATH 3: "+URI_class3.path)
        console.log("SOURCE 3: "+JSON.stringify(URI_class3.parameters)+"\n")

        
        console.log("PATH invalid: "+URI_class_invalid.path)
        console.log("SOURCE invalid: "+JSON.stringify(URI_class_invalid.parameters)+"\n")

        URI_class_invalid.setURI('visma-identity://login?source=severa')
        console.log("PATH fixed: "+URI_class_invalid.path)
        console.log("SOURCE fixed: "+JSON.stringify(URI_class_invalid.parameters)+"\n")
    }
    
    main_client();
    console.log("Javascript file is running.")