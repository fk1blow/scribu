export const longText = `## heading 1

below heading 1

#### heading for?

what is this thing

### last heading inside here

------------------------------------------------------------------

# Era DataTypes

## Terminology

- **DataValue** An object value with an associated DataType
- **DataSchema** A map of string key to DataType
- **DataMapper** A map of string key to Expression that evaulautes to a DataValue
- **DataSet** A map of string key to DataValue

## DataTypes
- String?
- Number?
- Bool?
- DateTime?
- TimeSpan?
- String[]?
- Number[]?
- Enum<>
- Webhook<>
- WebhookValue<>

## Input:
- DataSchema: Dictionary entries with string key and DataType as value (represented as string)
- DataMapper: Dictionary entries with string key and string value
- DataValue: Dictionary entries based in DataSchma with matching string keys and value pickers

**DataSetInput**

The UI for representing a DataSet is based on a underlying DataSchema.
Each entry has a diffrent input method depending on the DataType.
Optionality should also to visualle representing with providing DataSet inputasdasd

- String: Regular single-line text field
- Number: Numeric input field
- Bool: Checkbox/dropdown
- DateTime: Calendar picker or similar
- TimeSpan: hours/minutes/seconds pickers
- String[]: Single input field with "tagging" behavior (every space adds new entry)
- Number[]: Single input field with "tagging" behavior (every space adds new entry)
- Enum: Single input field with "tagging" behavior (every space adds new entry)
- Webhook: Dropdown with eligble webhooks
- WebhookVa


------------------------------------------------------------------


## from Carsten

# Essential features
Features that the editors needs in order to be considered fully functional

- BACKEND: Should not allow saving saga with 0 stages
- Missing the description field
- All DataType inputs should be editable text fields
- When saving invalid Saga, the "Logs" console should open and display all validation message recived in the server response

# Expected features
Features that are de-facto standards and otherwise expected for a 'respectable' standard web application.
Lack of expected features indicates an alpha or beta state of the application.

- When updating when Id of a Transition or a Stage the Saga graph should be correctly to reflect
- Store the zoom and panning for each Saga in the LocalStorage
- Should be able to visually distinguish two overlapping connections going to and from the same stage
- Clicking process entity should open process designer as well
- Referencing Stages, Transitions or Processes should be selected via dropdown rather than free text field
- Referencing Stages, Transitions or Processes should automatically display prepolated mapper based on entity's input schema


------------------------------------------------------------------


center the saga when initially loaded
	- find the initial/root node
	- calculate the center

the stage id on the transitions panel should be a selector instead
of a plain text field

instead of having the labels named , add the prefix of the type
of the resource, eg: for a stage you should have
instead of id [stage id input text]

show the validation logs indie the console


## editor

store the zoom and pan in the localstorage, per saga(for each saga)
for each user

distinguish 2 connections going from the same source to the same target


## metadata

add a way to edit the metadata description(maybe inside the metadata panel)


## console

open the console(expand) when you click the "logs" or the "saga" buttons


## entity references

for stages, transitions and processes, when you reference another entity,
instead of a text input(with id), show a dropdown to select those refs


## stages

don't allow the deletion of all the stages(stop at the last one preset)

------------------------------------------------------------------


## transitions

when modifyin the transition id, the connection's reference is
being updated, but the scene connection label doesn't(see the edges wrapper)

the process section of the Transitions Panel should show a process
dropdown selector of process ids and instead of  label have
an  label

on the transitions panel's "Process" section, the field
should be removed

when selecting the process id inside the transitions panel, populate
the "Event Input" with the fields from inside the process


## kv dropdowns

modify the dropdowns for types to an plain input text from the dropdpwn selector


## process editor

input schema kv should modify from a dropdown to a text input


## anchors

see if you can add multiple connection endpoints;

also, if there are multiple connections going to a node, could you
modify the stage/node height(the html container)?

can i drop the connection directly on top of the node and not
directly on the endpoint(circle and rectangle)
`
