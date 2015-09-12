#!/usr/bin/osascript

set macbook_monitor_dimensions to {width: 1440, height: 900}
set macbook_monitor_bounds to {-1440, 1000, 0, 1900}

set thunderbolt_monitor_dimensions to {width: 2560, height: 1440}
set thunderbolt_monitor_bounds to {0, 44, 2560, 1440}

tell application "Finder"
  open folder "Utorrent" of folder "Downloads" of folder "dh" of folder "Users" of startup disk of application "Finder"
  set properties of front window to {toolbar visible: false, current view: list view, bounds: {-719, 1000, 0, 1900}}
end tell

tell application "Terminal"
  do script "cd /Users/dh/Downloads/Utorrent && ls"
  set properties of front window to {size: {720, 900}, position: {-1440, 0}}
end tell

tell application "Firefox" to activate
tell application "System Events" to keystroke "n" using command down
delay 1
tell application "Firefox"
  open location "http://www.imdb.com/"
  set properties of front window to {bounds: {0, 0, 1280, 1440}}
end tell

tell application "System Events" to keystroke "n" using command down
delay 1
tell application "Firefox"
  open location "http://www.subdivx.com/"
  open location "http://www.subswiki.com/"
  open location "http://engsub.net/"
  set properties of front window to {bounds: {1280, 0, 2560, 1440}}
end tell
