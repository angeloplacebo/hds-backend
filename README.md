# API

* ### **URL**
  > https://hds-backend.herokuapp.com/api

* ### **Method**
  `GET` | `POST` | `DELETE`

* ### **GET**

  ### Query:
  
    Required:

      item = "hd" | "img-bkp" | "both"

    Optional:

      text = String
    
    >text empty or unset return everything without pagination
  
  ### URL Params:

      /hd/_id

      /content/_id

  ### Success Response:
    * Code: 200

      Content: `{ }`
      
  ### Error Response:
  
    * Code: 404
    
      Content: `{ "error": "not found" } `
    
  

* ### **POST**

  ### URL Routes
  /hd
  /content
  /content/file

  ### JSON:

  * /hd
    ```
    </>TEXT: JSON

    {
      "Fabricante": "Western Digital",
      "Modelo": "Elements - Basic Storage",
      "TAG": "WD-00",
      "PN": "XXXXXXXXXXXXX-XX",
      "SN": "XXXXXXXXXXXX",
      "Capacidade":"1 TB",
      "Local":"room"
    }
    ```

  * /content
    ```
    </>TEXT: JSON

    {
      "Name": "img_Teste9",
      "Size": "18,09 GB",
      "Local": "WD-00",
      "Date": "dd/mm/aaaa"
    }
    ```

  * /content/file
    ```
    STRUCTURED: Multipart Form
    
    file: filename.json
    ```

    *filename.json:*
    ```
    {
      "0": {
        "Name": "name",
        "Size": "10,00 GB",
        "Local": "WD-01",
        "Date": "19/12/2020"
      },
      "1": {
        "Name": "name",
        "Size": "10,00 GB",
        "Local": "WD-01",
        "Date": "19/12/2020"
      },...
    }
    ```


  ### Success Response:
    * Code: 201

      Content: `{ _id: String value generated, ...json inserted  }`
    
    >Multipart Form __for content array only __
    * Code: 201
      Content: 
      ```
      {
        "0": {
          "_id": "String value generated",
          "Name": "name",
          "Size": "10,00 GB",
          "Local": "WD-01",
          "Date": "19/12/2020"
        },
        "1": {
          "_id": "String value generated",
          "Name": "name",
          "Size": "10,00 GB",
          "Local": "WD-01",
          "Date": "19/12/2020"
        },...
      }
      ```
      
  ### Error Response:
  
    * Code: 500
    
      Content: `{ error } `
    
    

* ### **DELETE**

  ### Query:
  
    Required:

      item = "hd" | "imgbkp" 

      id = String

  ### Success Response:
    * Code: 200

      Content: `success || not found or already deleted `
      
  ### Error Response:
  
    * Code: 404
    
      Content: `error`
    
  
***
## Response

  * **ITEM: hd**
```
{
  "hds":[
    {
      "_id": ,
      "Fabricante": 
      "Modelo": ,
      "TAG": ,
      "PN": ,
      "SN": ,
      "Capacidade":,
      "Local": 
    }
  ]
}
```

  * **ITEM: img-bkp**
```
{
  "img-bkp":[
    {
      "_id": ,
      "Name": ,
      "Size": ,
      "Local": ,
      "Date": 
    }
  ]
}
```

> requests by url params return object without the array name