drugdictionary
==============

Post JSON formatted queries to the app engine to 
access the drug database.  Most valid queries will follow
this basic form:

```JSON
{
	"username":"your username",
	"password":"your password",
	"type": "some type"
}
```

```
String: utf-8 coded string
HTML_Text: HTML formated text
```

*drug* prototype
```JSON
{"generic_name":	String,
 "brand_name":	String,
 "how_supplied_storage_prior":HTML_Text,
 "reconstitution_concentration":HTML_Text,
 "stability_post_reconstruction":HTML_Text,
 "vehicle_dilution":HTML_Text,
 "administration":HTML_Text,
 "misc_notes":HTML_Text,
 "references":HTML_Text,
 //planned
 "black_box":HTML_Text
}
```



---

*type drug_list*

```JSON
{
	"username":"your username",
	"password":"your password",
	"type": "drug_list"
}
```

The response to this query can be quite huge, I may decide
to change it later, but fairly simple.

```JSON 
{type: "list", 
 data: [drug]
} 	   
```	
 