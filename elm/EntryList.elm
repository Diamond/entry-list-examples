module EntryList where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import StartApp.Simple as StartApp

-- MODEL
type alias Model = { newEntry: String, entries: List String }

initialModel : Model
initialModel =
  { newEntry = "", entries = ["a", "b", "c"] }

-- UPDATE
type Action = NoOp | Add String | Update String | Remove String

update : Action -> Model -> Model
update action model =
  case action of
    NoOp -> model
    Add entry -> { model | entries = model.entries ++ [entry], newEntry = "" }
    Update entry -> { model | newEntry = entry }
    Remove entry ->
      let
          filteredList =
            List.filter (\e -> e /= entry) model.entries
      in
         { model | entries = filteredList }

-- VIEW
entryList : Signal.Address Action -> Model -> Html
entryList address model =
  ul [ ] (List.map (entryItem address) model.entries)

entryItem : Signal.Address Action -> String -> Html
entryItem address entry =
  li [] [
    span [ ] [ text entry ],
    button [ onClick address (Remove entry) ] [ text "Remove" ]
    ]

entryForm : Signal.Address Action -> Model -> Html
entryForm address model =
  div [ ] [
    input [
      type' "text",
      placeholder "Entry Name",
      value model.newEntry,
      on "input" targetValue (Signal.message address << Update)
      ] [ ],
      button [ onClick address (Add model.newEntry) ] [ text "Add" ]
      ]

debug : Model -> Html
debug model =
  div [ ] [
    h3 [ ] [ text ("New Entry: " ++ model.newEntry) ]
    ]

view : Signal.Address Action -> Model -> Html
view address model =
  div [ ] [
    h2 [ ] [ text "Entries" ],
    entryForm address model,
    entryList address model,
    debug model
    ]

-- MAIN

main : Signal Html
main =
  StartApp.start { model = initialModel, view = view, update = update }

