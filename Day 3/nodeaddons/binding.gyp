{
  "targets": [
    {
      "target_name": "myAddon", 
      "sources": [ "myAddon.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}		

