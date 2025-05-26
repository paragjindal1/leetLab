import {body} from "express-validator";

export const loginValidator =()=>{
    return [
        body("email")
        .isEmail()
        .withMessage("Please enter a valid email"),

        body("password")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        .withMessage("Password must be at least 8 characters long")
    ]
}


export const registerValidator =()=>{
    return [
        body("name").optional(),
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }).withMessage("Password must be at least 6 characters long")
    ]
}

export const createProblemValidator =()=>{
    return [
        body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("tags")
    .isArray()
    .withMessage("Tags should be in array"),

  body("userId")
    .customSanitizer(value => value.toString())
    .isString()
    .withMessage("userId should be a string"),

  body("examples")
    .isJSON()
    .withMessage("Examples should be in JSON"),

  body("hints")
    .optional()
    .isString()
    .withMessage("Hints should be a string"),

  body("editorial")
    .optional()
    .isString()
    .withMessage("Editorial should be a string"),

  body("constraints")
    .optional()
    .isString()
    .withMessage("Constraints should be a string"),

  body("testcases")
    .isJSON()
    .withMessage("Testcases should be in JSON"),

  body("codeSnippets")
    .isJSON()
    .withMessage("CodeSnippets should be in JSON"),

  body("referenceSolutions")
    .isJSON()
    .withMessage("ReferenceSolutions should be in JSON"),
    ]
}

export const updatedProblemvalidator =()=>{
    return [
    body("title")
    .optional()
    .isString()
    .withMessage("Title should be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description should be a string"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags should be an array"),

  body("userId")
    .isString()
    .withMessage("userId should be a string"),

  body("examples")
    .optional()
    .isJSON()
    .withMessage("Examples should be in JSON"),

  body("hints")
    .optional()
    .isString()
    .withMessage("Hints should be a string"),

  body("editorial")
    .optional()
    .isString()
    .withMessage("Editorial should be a string"),

  body("constraints")
    .optional()
    .isString()
    .withMessage("Constraints should be a string"),

  body("testcases")
    .optional()
    .isJSON()
    .withMessage("Testcases should be in JSON"),

  body("codeSnippets")
    .optional()
    .isJSON()
    .withMessage("CodeSnippets should be in JSON"),

  body("referenceSolutions")
    .optional()
    .isJSON()
    .withMessage("ReferenceSolutions should be in JSON"),
    ]
}

export const executeCodeAndRunCodeValidator = ()=>{
    return [
        body("problemId")
        .isString()
        .withMessage("ProblemId should be a string"),
        body("sourceCode")
        .isJSON()
        .withMessage("SourceCode should be a JSON"),
        body("languageId")
        .isString()
        .withMessage("Language should be a string"),
    ]
}


export const createPlaylistValidator = ()=>{
    return [
        body("name")
        .isString()
        .withMessage("Name should be a string"),
        body("description")
        .isString()
        .withMessage("Description should be a string"),
    ]
}