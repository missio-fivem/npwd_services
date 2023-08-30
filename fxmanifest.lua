fx_version "cerulean"
game "gta5"

client_script 'client/client.lua'
server_script 'server/server.lua'

shared_scripts {
    '@ox_lib/init.lua',
    "@qbx-core/import.lua",
    'config.lua'
}

modules {
    "qbx-core:playerdata",
    "qbx-core:core"
}

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/*.js',
}

lua54 "yes"
