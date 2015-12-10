module EntryList where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import String

import StartApp.Simple as StartApp

-- MODEL
type alias Model = { newEntry: String, searchFor: String, entries: List String, filteredEntries: List String }

initialModel : Model
initialModel =
  { newEntry = "", searchFor = "", entries = ["a", "b", "c"], filteredEntries = ["a", "b", "c"] }

-- UPDATE
type Action = NoOp | Add String | Update String | Remove String | Search String

update : Action -> Model -> Model
update action model =
  case action of
    NoOp -> model
    Add entry ->
      { model | entries = model.entries ++ [entry], newEntry = "" }
      |> updateList
    Update entry -> { model | newEntry = entry }
    Remove entry ->
      let
        filteredList =
          List.filter (\e -> e /= entry) model.entries
      in
        { model | entries = filteredList }
        |> updateList
    Search entry ->
      { model | searchFor = entry }
      |> updateList

updateList model =
  let
    doSearch = not (String.isEmpty model.searchFor)
    filteredList =
      if doSearch
        then List.filter (\e -> String.contains model.searchFor e) (model.entries)
        else model.entries
  in
    { model | filteredEntries = filteredList }

-- VIEW
searchForm : Signal.Address Action -> Model -> Html
searchForm address model =
  div [ ] [
    input [
      type' "text",
      placeholder "Search",
      value model.searchFor,
      on "input" targetValue (Signal.message address << Search)
    ] [ ]
  ]

entryList : Signal.Address Action -> Model -> Html
entryList address model =
  ul [ ] (List.map (entryItem address) model.filteredEntries)

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
    searchForm address model,
    entryForm address model,
    entryList address model,
    debug model
  ]

-- MAIN

main : Signal Html
main =
  StartApp.start { model = initialModel, view = view, update = update }
