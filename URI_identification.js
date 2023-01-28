

function main_client() {
// Defines the client which will use the URI_identification class.
    let test_URI = 'visma-identity://login?source=severa';
    let test_URI2 = 'visma-identity://confirm?source=netvisor&paymentnumber=102226';
    let test_URI3 = 'visma-identity://sign?source=vismasign&documentid=105ab44'
    let invalid_URI = 'visma-identity://login?sorce=severa';

    const URI_class = new URI_identification(test_URI2);
    URI_class.printURI()
    URI_scheme = URI_class.validateScheme();

    console.log("PATH: "+URI_class.path)
    console.log("SOURCE: "+JSON.stringify(URI_class.parameters))

}

main_client();
console.log("Javascript file is running.")


function URI_identification(URI) {
    // This is a constructor function, which creates URI object. The URI object has values URI, path and parameters.
    this.URI = URI;  // The given URI to the object


    // This function logs the given URI to the console for debugging.
    this.printURI = function() {
        console.log(this.URI);
    }

    // This function validates that the scheme matches to the "visma-identity" scheme. It returns false in the case of invalid scheme, and true otherwise.
    this.validateScheme = function() {
        // Splitting the string. The first part of the string should contain the given scheme.
        let splitString = this.URI.split(":");
        let schemeString = splitString[0];

        if(schemeString!=="visma-identity") return false
        return true;
    }
    

    this.parseParameters = function(parameter_array, path) {
        // The valid parameter keys that each path should contain.
        let validPathParameters = {"login": ["source"], 
        "confirm": ["source","paymentnumber"], 
        "sign": ["source", "documentid"]}
        // Amount of parameters given in the URI.
        let parameter_amount = parameter_array.length;
        // Defining the JSON object.
        let parameter_json = {};
        // Defining keys array, where we will temporarily store all of the keys found which can then be compared to the keys that certain paths requires (validPathParameters).
        let keysArray = [];

        // Loop through the given parameter_array:
        for (let index = 0; index < parameter_amount; index++) {
            parameter = parameter_array[index].split("="); // Splits the parameter in to key and value pair
            
            if(isNaN(parameter[1]) == false) { // This checks if the current parameter is an integer, and if it is then it casts the string to be an integer.
                parameter[1] = parseInt(parameter[1]);
            } 

            parameter_json[parameter[0]] = parameter[1]; // Saves the current parameter value to correspond to current key. 
            keysArray.push(parameter[0]);
        }

        // This compares the stored keys in the keysArray, to the ones required in the validPathParameters JSON.
        if(keysArray.sort().join(',') !== validPathParameters[path].sort().join(',')){
            parameter_json = "Current path does not have all of the required parameters or they are invalid."
        }

        return parameter_json
    }

    this.parseURI = function() {
        // This function parses the given URI, and returns found path and parameters as JSON. 
        // If the validation of the schema, paths or parameters do not match, their values will give error messages on which part of the URI is not valid. 

        let validPaths = ["login", "confirm", "sign"];
        // If the validation does not match, then path and parameters keys will have values "Invalid URI"
        if(this.validateScheme() != true) return {"path" : "Invalid Schema", "parameters": "Invalid Schema"}

        //Splits the URI in to schema and rest of the URI which contains the path and parameters
        let splitURI = URI.split(":");
        let scheme = splitURI[0];

        let pathURI = splitURI[1];
        pathURI = pathURI.slice(2); // Remove the "//"" characters from the start of the string

        // Here we split the string on the "?" character, so first element is the path, and other element is the parameters.
        let pathURI_array = pathURI.split("?");
        let path = pathURI_array[0];

        // If the path is not a valid path, then parseURI will return json with paths and parameters values as "Invalid path."
        if(validPaths.includes(path) == false) {return {"path": "Invalid path.", "parameters": "Invalid path."}}

        // Splits the parameters on the "&" characters, so each parameter is its own array element. Each element is a string which matches the following schema: "key=value"
        let parameter_array = pathURI_array[1].split("&");

        // Calls the function parseParameters to parse the parameters
        let parameters = this.parseParameters(parameter_array, path);

        let parsedURI = {
            "path": path,
            "parameters": parameters
        }
        return parsedURI;
    }

    
    let parsedURI = this.parseURI()
    this.path = parsedURI.path;
    this.parameters = parsedURI.parameters;
    

}