# FeedHenry Hello List Cloud Application

This app illustrates the creation of a DB-backed REST API which implements the full CRUDL set of operations. 

# Group Hello World API

# todos [/todo]

'Todos' endpoint.

## todos [GET] 

List all todos

+ Request (application/json)

+ Response 200 (application/json)
    + Body
            [
              { "name" : "aTodo"}
            ]
            
## todos [POST] 

Create todo entry

+ Request (application/json)
    + Body
            {
              "name": "My new todo"
            }

+ Response 200 (application/json)
    + Body
            {
              "name": "My new todo"
            }

# todo [/todo/{id}]
Operations on an individual todo entry, as identified by guid `{id}`.

+ Parameters
    + id - Id of the todo item being operated on

## Read a single todo entry [GET] 
Read operation
+ Request (application/json)

+ Response 200 (application/json)

    + Body

            {
              "name" : "My todo",
            }

## Update a single todo item [PUT] 
Updates a TODO entry by ID
+ Request (application/json)

    + Body

            {
              "name" : "My update to this todo"
            }

+ Response 200 (application/json)

    + Body

            {
              "name" : "My update to this todo"
            }

## Delete a todo entry [DELETE] 
Removes the todo entry specified by id
+ Request (application/json)

+ Response 200 (application/json)

    + Body
            
