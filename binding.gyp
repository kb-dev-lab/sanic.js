{
  "targets": [{
    "target_name": "sanicjs",
    "sources": [ "native/main.cc" ],
    "cflags!": ["-fno-exceptions"],
    "cflags_cc!": ["-fno-exceptions"],
    "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")", "/usr/include"],
    "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
    "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
  }]
}